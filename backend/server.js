const express = require('express');
const connectDB = require('./config/database');
const noteRoutes = require('./routes/noteRoutes');
const folderRoutes = require('./routes/folderRoutes');
require('dotenv').config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use('/api/notes', noteRoutes);
app.use('/api/folders', folderRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
