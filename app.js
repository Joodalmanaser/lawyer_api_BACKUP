const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, 'config.env') });

const app = express();

// ===== Middlewares =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger فقط وقت التطوير
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`🚀 Mode: ${process.env.NODE_ENV}`);
}


// ===== Routes =====
const routes = require('./routes');

// Home
app.get('/', (req, res) => {
  res.status(200).send('API is running ✅');
});

app.use('/api', routes);

// ===== Static files =====
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== 404 handler =====
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});

// ===== Global error handler =====
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

module.exports = app;
