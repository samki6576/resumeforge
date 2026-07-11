const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Error:', err.message));

// Log all requests
app.use((req, res, next) => {
    console.log('Request:', req.method, req.path);
    next();
});

// Routes
app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/resume', require('../server/routes/resume'));
app.use('/api/ai', require('../server/routes/ai'));

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!', method: req.method });
});

// Health
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Root
app.get('/', (req, res) => {
    res.json({ message: 'ResumeForge API on Vercel!' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
