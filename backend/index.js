const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config({ path: './config/.env' });


const app = express();
const PORT = 5000;

app.use(express.json());

// Routes
app.use('/notes', noteRoutes);

// MongoDB connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connection successful"))
.catch((err) => console.error("MongoDB connection failed:", err));

// Start server
app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);
