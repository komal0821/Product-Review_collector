from enum import Enum
from typing import Dict, Optional
from pydantic import BaseModel

class ConversationState(Enum):
    WAITING_FOR_PRODUCT = "waiting_for_product"
    WAITING_FOR_NAME = "waiting_for_name"
    WAITING_FOR_REVIEW = "waiting_for_review"
    COMPLETED = "completed"

class UserSession(BaseModel):
    contact_number: str
    state: ConversationState
    product_name: Optional[str] = None
    user_name: Optional[str] = None
    product_review: Optional[str] = None

class ConversationManager:
    def __init__(self):
        self.sessions: Dict[str, UserSession] = {}
    
    def get_session(self, contact_number: str) -> UserSession:
        if contact_number not in self.sessions:
            self.sessions[contact_number] = UserSession(
                contact_number=contact_number,
                state=ConversationState.WAITING_FOR_PRODUCT
            )
        return self.sessions[contact_number]
    
    def update_session(self, contact_number: str, **kwargs):
        session = self.get_session(contact_number)
        for key, value in kwargs.items():
            setattr(session, key, value)
        self.sessions[contact_number] = session
    
    def reset_session(self, contact_number: str):
        if contact_number in self.sessions:
            del self.sessions[contact_number]
    
    def process_message(self, contact_number: str, message: str) -> str:
        session = self.get_session(contact_number)
        
        if session.state == ConversationState.WAITING_FOR_PRODUCT:
            self.update_session(
                contact_number, 
                product_name=message.strip(),
                state=ConversationState.WAITING_FOR_NAME
            )
            return "What's your name?"
        
        elif session.state == ConversationState.WAITING_FOR_NAME:
            self.update_session(
                contact_number,
                user_name=message.strip(),
                state=ConversationState.WAITING_FOR_REVIEW
            )
            return f"Please send your review for {session.product_name}."
        
        elif session.state == ConversationState.WAITING_FOR_REVIEW:
            self.update_session(
                contact_number,
                product_review=message.strip(),
                state=ConversationState.COMPLETED
            )
            return f"Thanks {session.user_name} -- your review for {session.product_name} has been recorded."
        
        else:
            self.reset_session(contact_number)
            return "Which product is this review for?"

conversation_manager = ConversationManager()
