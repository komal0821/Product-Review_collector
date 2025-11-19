import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Star, RefreshCw, Users, Calendar, Phone, Sparkles, TrendingUp } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'https://web-production-0e295.up.railway.app';

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, thisWeek: 0, avgRating: 0 });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/reviews`);
      setReviews(response.data);
      calculateStats(response.data);
      setError(null);
      toast.success('Reviews loaded successfully!');
    } catch (err) {
      setError('Failed to fetch reviews. Make sure the backend is running.');
      toast.error('Failed to load reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const thisWeekReviews = reviewsData.filter(review => 
      new Date(review.created_at) > weekAgo
    );

    setStats({
      total: reviewsData.length,
      thisWeek: thisWeekReviews.length,
      avgRating: 4.5 // Mock rating for demo
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const refreshReviews = () => {
    fetchReviews();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <div className="App loading-container">
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw size={48} />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="loading-text"
        >
          Loading amazing reviews...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App error-container">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="error-card"
        >
          <MessageCircle size={64} className="error-icon" />
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <motion.button 
            onClick={refreshReviews} 
            className="retry-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={20} />
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="App">
      <Toaster position="top-right" />
      
      {/* Hero Header */}
      <motion.header 
        className="hero-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hero-content">
          <motion.div 
            className="hero-icon"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <MessageCircle size={64} />
          </motion.div>
          <h1>WhatsApp Product Reviews</h1>
          <p>Real feedback from real customers via WhatsApp</p>
          
          <motion.button 
            onClick={refreshReviews} 
            className="refresh-btn"
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <RefreshCw size={20} />
            Refresh Reviews
          </motion.button>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <motion.div 
            className="floating-star"
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star size={24} />
          </motion.div>
          <motion.div 
            className="floating-sparkle"
            animate={{ 
              y: [10, -10, 10],
              x: [-5, 5, -5],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Sparkles size={20} />
          </motion.div>
        </div>
      </motion.header>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="stats-grid">
          <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
            <Users size={32} />
            <h3>{stats.total}</h3>
            <p>Total Reviews</p>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
            <TrendingUp size={32} />
            <h3>{stats.thisWeek}</h3>
            <p>This Week</p>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
            <Star size={32} />
            <h3>{stats.avgRating}</h3>
            <p>Avg Rating</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence>
          {reviews.length === 0 ? (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <MessageCircle size={80} className="empty-icon" />
              <h2>No reviews yet!</h2>
              <p>Start a WhatsApp conversation to collect your first review</p>
              <div className="whatsapp-demo">
                <div className="demo-message">
                  <span>👋 Send "Hi" to get started</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="reviews-section"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Customer Reviews ({reviews.length})
              </motion.h2>
              
              <motion.div 
                className="reviews-grid"
                variants={containerVariants}
              >
                {reviews.map((review, index) => (
                  <motion.div 
                    key={review.id} 
                    className="review-card"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                    layout
                  >
                    <div className="review-header">
                      <div className="product-info">
                        <h3 className="product-name">{review.product_name}</h3>
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + i * 0.1 }}
                            >
                              <Star size={16} fill="#FFD700" color="#FFD700" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="review-meta">
                        <Calendar size={14} />
                        <span>{formatDate(review.created_at)}</span>
                      </div>
                    </div>
                    
                    <div className="review-content">
                      <blockquote className="review-text">
                        "{review.product_review}"
                      </blockquote>
                      
                      <div className="review-footer">
                        <div className="reviewer-info">
                          <strong>{review.user_name}</strong>
                          <div className="contact-info">
                            <Phone size={12} />
                            <span>{review.contact_number}</span>
                          </div>
                        </div>
                        <div className="whatsapp-badge">
                          <MessageCircle size={16} />
                          <span>WhatsApp</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer 
        className="app-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="footer-content">
          <MessageCircle size={24} />
          <p>Send a WhatsApp message to start collecting reviews!</p>
          <div className="footer-stats">
            <span>Powered by WhatsApp Business API</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
