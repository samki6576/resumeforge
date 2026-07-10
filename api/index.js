const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const serverless = require('serverless-http');

dotenv.config({ path: path.resolve(__dirname, '../server/.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

app.options('*', cors());
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,x-auth-token');
        return res.sendStatus(200);
    }
    next();
});

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log('MongoDB Error:', err.message));
}

app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/resume', require('../server/routes/resume'));
app.use('/api/ai', require('../server/routes/ai'));

app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.get('/', (req, res) => {
    res.json({ message: 'ResumeForge API is running on Vercel!' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Something went wrong!' });
});

const handler = serverless(app);
module.exports = handler;
module.exports.app = app;
