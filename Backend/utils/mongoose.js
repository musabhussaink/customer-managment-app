const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = { connectDB };