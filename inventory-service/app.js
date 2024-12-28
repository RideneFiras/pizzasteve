const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios'); // Import axios for HTTP requests
const connectDB = require('./config/db');
const inventoryRoutes = require('./routes/inventoryRoutes');

dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5008;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/inventory', inventoryRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Inventory Service is running...');
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
  console.log(`Inventory Service running on port ${PORT}`);
  await registerWithDiscovery('inventory-service', 'http://localhost', PORT);
});
