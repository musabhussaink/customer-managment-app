const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure unique usernames
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique emails
  },
  profilePicture: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Customer', CustomerSchema);