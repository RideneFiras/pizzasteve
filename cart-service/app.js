const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');

dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5002;
app.use(cors());
app.get('/test', (req, res) => {
    res.json({ message: 'Product-Service is working!' });
  });
// Routes
app.use('/api/cart', cartRoutes);


app.listen(PORT, () => {
  console.log(`Cart Service running on port ${PORT}`);
});
