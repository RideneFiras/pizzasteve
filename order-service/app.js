const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
const axios = require('axios'); // Import axios for HTTP requests

dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/orders', orderRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Order Service is running...');
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
  console.log(`Order Service running on port ${PORT}`);
  await registerWithDiscovery('order-service', 'http://localhost', PORT);
});
