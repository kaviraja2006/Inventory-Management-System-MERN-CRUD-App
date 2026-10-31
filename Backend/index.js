const app = require('./app');
const { connectToMongo } = require('./db');

const port = process.env.PORT || 3001;

// Connect to MongoDB
connectToMongo();

const server = app.listen(port, () => {
  console.log(`Inventory Management Backend listening on port ${port}`);
});

// Graceful shutdown handling for containerized deployments
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = server;
