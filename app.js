// app.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'config.env') });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Home route
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
