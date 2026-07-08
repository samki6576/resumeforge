const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Error:', err.message));

// Routes - Note the path changes for Vercel
app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/resume', require('../server/routes/resume'));
app.use('/api/ai', require('../server/routes/ai'));

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'ResumeForge API is running on Vercel!' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Export for Vercel (NO app.listen!)
module.exports = app;
