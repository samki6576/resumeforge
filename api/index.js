const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

app.use(express.json());

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI is not set');
        return null;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });
        console.log('MongoDB Connected');
        return mongoose.connection;
    } catch (err) {
        console.error('MongoDB Error:', err.message);
        return null;
    }
};

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/resume', require('../server/routes/resume'));
app.use('/api/ai', require('../server/routes/ai'));

app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = serverless(app);
