const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Cart Service running on port ${PORT}`);
});
