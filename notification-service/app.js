const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/notifications', notificationRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Notification Service is running...');
});

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
