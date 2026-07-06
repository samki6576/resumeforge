const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resumeforge')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Error:', err.message));

// Routes - Import as functions
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const aiRoutes = require('./routes/ai');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ai', aiRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Health check - THIS IS IMPORTANT FOR PXXL
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'ResumeForge API is running!' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Get port from environment - Pxxl provides this
const PORT = process.env.PORT || 5000;

// Start server - Bind to 0.0.0.0 to accept all connections
app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on port ' + PORT);
    console.log('Health check: http://0.0.0.0:' + PORT + '/health');
});
