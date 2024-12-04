const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors middleware
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// CORS Configuration
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from the frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specified HTTP methods
  credentials: true, // Allow cookies if needed
}));

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
