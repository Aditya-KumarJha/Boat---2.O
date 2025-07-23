const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Load env variables
dotenv.config();

// DB connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('🎧 Boat API running...');
});

// Product routes
const productRoutes = require('./src/routes/productRoutes');
app.use('/api/products', productRoutes);

// Clerk user sync route
const authRoutes = require('./src/routes/authRoutes');
app.use('/api', authRoutes);

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
