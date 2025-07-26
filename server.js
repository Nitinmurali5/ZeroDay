const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/database');

// Import routes
const lostFoundRoutes = require('./routes/lostFound');
const complaintsRoutes = require('./routes/complaints');
const authRoutes = require('./routes/auth');
const busBookingRoutes = require('./routes/busBooking');
const skillsRoutes = require('./routes/skills');
const pollsRoutes = require('./routes/polls');
const ticketsRoutes = require('./routes/tickets');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (your HTML, CSS, JS files)
app.use(express.static(path.join(__dirname)));

// API Routes
// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running and connected to MongoDB',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.use('/api/lost-found', lostFoundRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bus-booking', busBookingRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/polls', pollsRoutes);
app.use('/api/tickets', ticketsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Campus Hub API is running',
    services: ['Lost & Found', 'Complaints System', 'Authentication System'],
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve the main HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Catch-all handler for any other routes (serve the main app)
app.get('*', (req, res) => {
  // Check if it's an API route that doesn't exist
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: 'API endpoint not found'
    });
  }
  
  // For non-API routes, serve the main HTML file
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🏠 Campus Hub: http://localhost:${PORT}`);
  console.log(`🔐 Login System: http://localhost:${PORT}/log.html`);
  console.log(`📱 Lost & Found: http://localhost:${PORT}/lost-found.html`);
  console.log(`🏨 Complaints System: http://localhost:${PORT}/complaints.html`);
  console.log(`🔧 API Health check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});