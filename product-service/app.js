const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const axios = require('axios'); // Import axios for HTTP requests

// MongoDB Connection
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'Product-Service is working!' });
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
  console.log(`Product Service running on port ${PORT}`);
  await registerWithDiscovery('product-service', 'http://localhost', PORT);
});
