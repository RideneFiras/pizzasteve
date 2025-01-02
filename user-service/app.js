const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();
process.env.JWT_SECRET = 'your-secret-key';

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow all CORS requests

// Health Check Route
app.get('/test', (req, res) => {
  res.json({ message: "User-Service is working!" });
});

// Logging Middleware (for debugging incoming requests)
app.use((req, res, next) => {
  console.log(`Incoming request at User-Service: ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// User Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

// Register User Service with Discovery Server
const registerWithDiscovery = async () => {
  try {
    await axios.post('http://localhost:4000/register', {
      name: 'user', // This is the service name the gateway will recognize
      address: 'http://localhost',
      port: PORT,
    });
    console.log('User Service successfully registered with Discovery Server');
  } catch (error) {
    console.error('Failed to register with Discovery Server:', error.message);
  }
};

// Start the server and register with Discovery Server
app.listen(PORT, async () => {
  console.log(`User Service running on port ${PORT}`);
  await registerWithDiscovery();
});
