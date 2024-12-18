const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');

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

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});
