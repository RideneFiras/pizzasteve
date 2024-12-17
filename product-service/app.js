const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

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

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
