const express = require('express');
const connectDB = require('./config/database');
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config({ path: './config/.env' });

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/notes', noteRoutes);

// Start server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
