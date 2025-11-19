
# WhatsApp Product Reviews Application

A full-stack application that allows users to submit product reviews via WhatsApp conversations. The system processes messages through Twilio, stores reviews in PostgreSQL, and displays them in a beautiful React frontend with star ratings.

## 🏗️ Architecture

- **Backend**: FastAPI with Python (deployed on Railway)
- **Database**: PostgreSQL (Railway)
- **Frontend**: React with Framer Motion animations
- **WhatsApp Integration**: Twilio WhatsApp Sandbox
- **Conversation Flow**: State-managed review collection
- **Deployment**: Railway (Backend) + Local React Dev Server

## 📋 Features

- ⭐ **WhatsApp Conversation Flow**: Guided review collection via chat
- 🗄️ **Database Storage**: Persistent review storage in PostgreSQL
- 🔌 **REST API**: Clean API endpoints for review management
- ✨ **Beautiful React Dashboard**: Modern UI with animations and star ratings
- 🔄 **Real-time Updates**: Refresh functionality to see new reviews
- 📱 **Mobile-Responsive**: Works perfectly on all devices
- 🎨 **Modern Design**: Gradient backgrounds, animations, and beautiful cards

## 🚀 Live Demo

- **🌐 Frontend**: [https://komal0821.github.io/Product-Review_collector](https://komal0821.github.io/Product-Review_collector)
- **🔌 Backend API**: `https://web-production-0e295.up.railway.app`
- **📱 Complete System**: Frontend connects to live Railway backend

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- Twilio Account (free sandbox)

### 1. Clone Repository

```bash
git clone https://github.com/komal0821/Product-Review_collector.git
cd Product-Review_collector
```

### 2. Backend Setup (Already Deployed)

The backend is already deployed on Railway. You can also run it locally:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Copy environment file and configure
cp .env.example .env
# Edit .env with your database and Twilio credentials

# Run the FastAPI server locally (optional)
python main.py
```

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
3. **Configure Webhook**: Set webhook URL to `https://web-production-0e295.up.railway.app/webhook/whatsapp`
4. **Test**: Send "Hi" to your Twilio WhatsApp sandbox number

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

## � Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: ORM for database operations
- **PostgreSQL**: Robust relational database
- **Pydantic**: Data validation and settings management
- **python-multipart**: Form data handling

### Frontend
- **React**: Component-based UI library
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library
- **React Hot Toast**: Elegant notifications
- **Axios**: HTTP client for API calls

### Deployment & Infrastructure
- **Railway**: Backend and database hosting
- **Twilio**: WhatsApp Business API integration
- **Git**: Version control

## 🛠️ Development

### Environment Variables

Create a `.env` file with:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/whatsapp_reviews
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=whatsapp:+14155238886
```

### Database Schema
The application automatically creates tables on startup:

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

## 🚀 Deployment

### Backend (Railway) ✅ Already Deployed
- **URL**: `https://web-production-0e295.up.railway.app`
- **Database**: PostgreSQL on Railway
- **Auto-deployment**: Connected to GitHub main branch

### Frontend (GitHub Pages) ✅ Already Deployed
- **URL**: `https://komal0821.github.io/Product-Review_collector`
- **Auto-deployment**: Run `npm run deploy` to update
- **Connected to**: Live Railway backend

### Local Development
```bash
cd frontend
npm start  # Runs on localhost:3000
```

## 🔧 Troubleshooting

### Common Issues

1. **WhatsApp Messages Not Getting Replies**
   - Check Twilio webhook URL: `https://web-production-0e295.up.railway.app/webhook/whatsapp`
   - Verify webhook method is set to POST
   - Check Twilio Console > Monitor > Logs for errors

2. **Frontend Not Showing Reviews**
   - Ensure API URL is correct in `App.js`
   - Check browser console for CORS errors
   - Verify backend is running and accessible

3. **Database Connection Issues**
   - Railway PostgreSQL service should be linked to web service
   - Check DATABASE_URL environment variable in Railway
   - Use DATABASE_PUBLIC_URL if internal networking fails

4. **Local Development Issues**
   - Install all dependencies: `pip install -r requirements.txt`
   - Create `.env` file with proper credentials
   - Ensure PostgreSQL is running locally

## ✅ Current Status

- ✅ **Backend**: Deployed on Railway (`https://web-production-0e295.up.railway.app`)
- ✅ **Frontend**: Deployed on GitHub Pages (`https://komal0821.github.io/Product-Review_collector`)
- ✅ **Database**: PostgreSQL connected and working
- ✅ **WhatsApp Integration**: Twilio webhook configured and working
- ✅ **Full Flow**: WhatsApp → Database → Live Frontend working perfectly

## 🎯 Features Implemented

- ✅ **Star Ratings**: 5-star display for each review
- ✅ **Modern UI**: Gradient backgrounds and smooth animations
- ✅ **Responsive Design**: Works on all devices
- ✅ **Real-time Stats**: Total reviews and weekly counts
- ✅ **WhatsApp Badge**: Shows reviews came from WhatsApp
- ✅ **Clean Code**: Removed all unnecessary comments

## 📝 Future Enhancements

- [ ] Add user authentication
- [ ] Implement dynamic star ratings (1-5 based on sentiment)
- [ ] Add product categories and filtering
- [ ] Email notifications for new reviews
- [ ] Admin dashboard for review moderation
- [ ] WhatsApp message templates
- [ ] Review analytics and insights
- [ ] Export reviews to CSV/PDF

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Komal Priya**
- GitHub: [@komal0821](https://github.com/komal0821)
- Email: prisin114@gmail.com

---

⭐ **If you found this project helpful, please give it a star!** ⭐


