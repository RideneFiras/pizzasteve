const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');
const axios = require('axios'); // Import axios for HTTP requests

dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/payments', paymentRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Payment Service is running...');
});

// Discovery Server details
const DISCOVERY_SERVER_URL = 'http://localhost:4000/register';

// Function to register the service with the Discovery Server
const registerWithDiscovery = async (name, address, port) => {
  try {
    await axios.post(DISCOVERY_SERVER_URL, { name, address, port });
    console.log(`${name} registered with Discovery Server successfully`);
  } catch (error) {
    console.error(`Failed to register ${name} with Discovery Server: ${error.message}`);
  }
};

// Call registerWithDiscovery in app.listen
app.listen(PORT, async () => {
  console.log(`Payment Service running on port ${PORT}`);
  await registerWithDiscovery('payment-service', 'http://localhost', PORT);
});