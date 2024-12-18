const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
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

app.listen(PORT, () => {
  console.log(`Inventory Service running on port ${PORT}`);
});
