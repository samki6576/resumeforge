const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

const authRouter = require('../../server/routes/auth');

dotenv.config({ path: path.resolve(__dirname, '../../server/.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
};

app.use(cors(corsOptions));
app.use(express.json());

app.options('*', cors(corsOptions));
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', req.header('access-control-request-headers') || 'Content-Type,Authorization,x-auth-token');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});

app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  console.error('Auth function error:', err.message);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = serverless(app);
module.exports.app = app;
