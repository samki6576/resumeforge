const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../server/models/User');

dotenv.config({ path: path.resolve(__dirname, '../../server/.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function readJsonBody(req) {
  if (req.body) return req.body;

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (!chunks.length) return {};

  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return { raw };
  }
}

async function ensureDbConnection() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ message: 'Method not allowed' }));
  }

  try {
    const body = await readJsonBody(req);
    const { name, email, password } = body;

    if (!name || !email || !password) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ message: 'Please provide all required fields' }));
    }

    await ensureDbConnection();

    let user = await User.findOne({ email });
    if (user) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ message: 'User already exists' }));
    }

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ token, user: { id: user._id, name, email } }));
  } catch (error) {
    console.error('Register error:', error);
    res.statusCode = error.message === 'MONGODB_URI is not configured' ? 503 : 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ message: 'Server error' }));
  }
};

module.exports.default = module.exports;
module.exports.handler = module.exports;
