const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

app.use(express.json());

// ============ MONGODB CONNECTION WITH CACHING ============
let isConnected = false;

async function connectDB() {
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log('MongoDB already connected');
        return;
    }
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not set');
    }
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 8000,
        });
        isConnected = true;
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        throw err;
    }
}

// ============ MIDDLEWARE: Wait for DB Connection ============
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('DB connection error:', err.message);
        res.status(503).json({
            message: 'Database unavailable, please try again',
            error: err.message
        });
    }
});

// ============ ROUTES ============
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resume', require('./routes/resume'));
app.use('/api/ai', require('./routes/ai'));

// ============ HEALTH CHECK ============
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        database: dbStatus
    });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// ============ ERROR HANDLING ============
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Only listen if this file is run directly (not imported by Vercel)
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log('Server running on port ' + PORT);
    });
}

module.exports = app;
