const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS - Allow your Vercel frontend
app.use(cors({
  origin: 'https://resumeforge-h5yd.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err.message));

// ROUTES WITH CORRECT PATHS FOR PXXL
// If server.js is at root, routes are in server/routes/
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/resume', require('./server/routes/resume'));
app.use('/api/ai', require('./server/routes/ai'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.get('/', (req, res) => {
  res.json({ message: 'ResumeForge API is running!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});
