try {
  require('dotenv').config();
} catch (e) {
  // dotenv is optional in environments where variables are injected directly (e.g. Docker / CI)
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./Routes/router');

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// Health check endpoint for container orchestrators, monitoring & load balancers
app.get('/healthz', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: isDbConnected ? 'connected' : 'disconnected'
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Mount application routes
app.use(router);

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

module.exports = app;

