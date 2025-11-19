# WhatsApp Product Reviews Application

A full-stack application that allows users to submit product reviews via WhatsApp conversations. The system processes messages through Twilio, stores reviews in PostgreSQL, and displays them in a React frontend.

## 🏗️ Architecture

- **Backend**: FastAPI with Python
- **Database**: PostgreSQL
- **Frontend**: React
- **WhatsApp Integration**: Twilio WhatsApp Sandbox
- **Conversation Flow**: State-managed review collection

## 📋 Features

- **WhatsApp Conversation Flow**: Guided review collection via chat
- **Database Storage**: Persistent review storage in PostgreSQL
- **REST API**: Clean API endpoints for review management
- **React Dashboard**: Beautiful UI to display all reviews
- **Real-time Updates**: Refresh functionality to see new reviews

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL
- Twilio Account (free sandbox)

### 1. Database Setup

```bash
# Create PostgreSQL database
createdb whatsapp_reviews

# Or using psql
psql -c "CREATE DATABASE whatsapp_reviews;"
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Copy environment file and configure
cp .env.example .env
# Edit .env with your database and Twilio credentials

# Run the FastAPI server
python main.py
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

The frontend will be available at `http://localhost:3000`

### 4. Twilio WhatsApp Setup

1. **Create Twilio Account**: Sign up at [twilio.com](https://www.twilio.com)
2. **Access WhatsApp Sandbox**: Go to Console > Messaging > Try it out > Send a WhatsApp message
3. **Configure Webhook**: Set webhook URL to `https://your-domain.com/webhook/whatsapp`
4. **Update .env**: Add your Twilio credentials to `.env` file

## 📱 Conversation Flow

```
User: Hi
Bot: Which product is this review for?

User: iPhone 15
Bot: What's your name?

User: Aditi
Bot: Please send your review for iPhone 15.

User: Amazing battery life, very satisfied.
Bot: Thanks Aditi -- your review for iPhone 15 has been recorded.
```

## 🗄️ Database Schema

```sql
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    contact_number TEXT NOT NULL,
    user_name TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_review TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### GET /api/reviews
Returns all stored reviews in JSON format.

**Response:**
```json
[
  {
    "id": 1,
    "contact_number": "+1415XXXXXXX",
    "user_name": "Aditi",
    "product_name": "iPhone 15",
    "product_review": "Amazing battery life",
    "created_at": "2025-11-17T12:34:56Z"
  }
]
```

### POST /webhook/whatsapp
Webhook endpoint for receiving WhatsApp messages from Twilio.

**Form Parameters:**
- `From`: WhatsApp number (from Twilio)
- `Body`: Message content

## 🛠️ Development

### Running Tests
```bash
# Backend tests (if implemented)
pytest

# Frontend tests
cd frontend
npm test
```

### Database Migrations
The application automatically creates tables on startup. For production, consider using Alembic for migrations.

### Environment Variables

Create a `.env` file with:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/whatsapp_reviews
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=whatsapp:+14155238886
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Add `Procfile`: `web: uvicorn main:app --host 0.0.0.0 --port $PORT`
2. Configure environment variables
3. Add PostgreSQL addon

### Frontend Deployment (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `build` folder
3. Update API base URL for production

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env

2. **Twilio Webhook Not Working**
   - Ensure webhook URL is publicly accessible
   - Use ngrok for local development: `ngrok http 8000`

3. **CORS Issues**
   - Backend includes CORS middleware for localhost:3000
   - Update origins for production deployment

## 📝 Next Steps

- [ ] Add user authentication
- [ ] Implement review ratings (1-5 stars)
- [ ] Add product categories
- [ ] Email notifications for new reviews
- [ ] Admin dashboard for review moderation
- [ ] WhatsApp message templates
- [ ] Review analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
