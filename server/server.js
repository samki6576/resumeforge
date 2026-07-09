const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.REACT_APP_API_URL,
    'https://resumeforge-h5yd.vercel.app',
    'https://resumeforg.pxxl.run',
    'https://resumeforg.pxxl.app',
    'https://resumeforge.pxxl.run',
    'https://resumeforge.pxxl.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || /^https:\/\/.*\.vercel\.app$/i.test(origin) || /^https:\/\/.*\.(pxxl\.run|pxxl\.app)$/i.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

app.use(express.json());

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set. Please add it to your environment or .env file.');
} else {
    mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000
    })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log('MongoDB Error:', err.message));
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/resume', require('./routes/resume'));
app.use('/api/ai', require('./routes/ai'));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.get('/', (req, res) => {
    res.json({ message: 'ResumeForge API is running!' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = Number(process.env.PORT || process.env.PXXL_PORT || 5000);
app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on port ' + PORT);
});

module.exports = app;
