const mongoose = require('mongoose');

// USERS SCHEMA - MODEL
const usersSchema = new mongoose.Schema({
  id: {
    type: String
  },
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: false,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', usersSchema);
