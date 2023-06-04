const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set('strictQuery', false);
  mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err.message));
};

module.exports = connectDB;
