from fastapi import FastAPI, Depends, Form, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from sqlalchemy.orm import Session
from typing import List
import os
from datetime import datetime

from database import get_db, Review, create_tables
from conversation import conversation_manager, ConversationState
from pydantic import BaseModel

app = FastAPI(title="WhatsApp Product Reviews API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables on startup (with error handling)
try:
    create_tables()
    print("✅ Database tables created successfully")
except Exception as e:
    print(f"⚠️ Database connection failed: {e}")
    print("App will start without database - add DATABASE_URL environment variable")

class ReviewResponse(BaseModel):
    id: int
    contact_number: str
    user_name: str
    product_name: str
    product_review: str
    created_at: datetime

    class Config:
        from_attributes = True

@app.post("/webhook/whatsapp")
async def whatsapp_webhook(
    From: str = Form(...),
    Body: str = Form(...),
    db: Session = Depends(get_db)
):
    """
    Webhook endpoint for receiving WhatsApp messages from Twilio
    """
    contact_number = From.replace("whatsapp:", "")
    message = Body.strip()
    
    # Handle initial greeting
    if message.lower() in ["hi", "hello", "hey", "start"]:
        response_message = "Which product is this review for?"
    else:
        response_message = conversation_manager.process_message(contact_number, message)
    
    # Check if conversation is completed and save to database
    session = conversation_manager.get_session(contact_number)
    if session.state == ConversationState.COMPLETED:
        # Save review to database
        review = Review(
            contact_number=contact_number,
            user_name=session.user_name,
            product_name=session.product_name,
            product_review=session.product_review
        )
        db.add(review)
        db.commit()
        
        # Reset session for next review
        conversation_manager.reset_session(contact_number)
    
    # Return TwiML response with proper Content-Type
    twiml_response = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>{response_message}</Message>
</Response>"""
    
    return Response(content=twiml_response, media_type="application/xml")

@app.get("/api/reviews", response_model=List[ReviewResponse])
async def get_reviews(db: Session = Depends(get_db)):
    """
    Get all product reviews
    """
    reviews = db.query(Review).order_by(Review.created_at.desc()).all()
    return reviews

@app.get("/")
async def root():
    return {"message": "WhatsApp Product Reviews API is running!", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "whatsapp-reviews"}

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
