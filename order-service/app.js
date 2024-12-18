const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');

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

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
