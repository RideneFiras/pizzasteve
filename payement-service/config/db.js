const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Determine the MongoDB URI based on the environment
    const mongoURI =
      process.env.DOCKER_ENV === 'true'
        ? 'mongodb://root:example@payement-service-db:27017/payement?authSource=admin' // Docker MongoDB
        : 'mongodb://localhost:27017/payement'; // Local MongoDB

    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log(`MongoDB connected successfully: ${mongoURI}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
