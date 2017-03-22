const mongoose = require('mongoose');

// USERS SCHEMA - MODEL
const usersSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
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

module.exports = mongoose.model('usersSchema', usersSchema);
