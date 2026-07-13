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

let cachedDb = null;

const connectDB = async () => {
    if (cachedDb && mongoose.connection.readyState === 1) return cachedDb;
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        cachedDb = mongoose.connection;
        console.log('MongoDB Connected');
        return cachedDb;
    } catch (err) {
        console.error('MongoDB Error:', err.message);
        throw err;
    }
};

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ message: 'Database connection failed' });
    }
});

app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/resume', require('./server/routes/resume'));
app.use('/api/ai', require('./server/routes/ai'));

app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.get('/', (req, res) => {
    res.json({ message: 'ResumeForge API on Vercel!' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
module.exports.handler = serverless(app);
