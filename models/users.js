const mongoose = require('mongoose');

// USERS SCHEMA - MODEL
const usersSchema = mongoose.Schema({
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

const Users = module.exports = mongoose.model('Users', usersSchema);

// MONGODB FUNCTIONS - USERS SCHEMA

// Get Users
module.exports.getAllUsers = function(cb, limit) {
  // MongoDB Function to execute
  Users.find(cb).limit(limit);
}

// Get a part
module.exports.getUserById = function(userId, cb) {
  // MongoDB Function to execute
  Users.findById(userId, cb);
}

// Add part
module.exports.addUser = function(userObj, cb) {
  // MongoDB Function to execute
  Users.create(userObj, cb);
}

// Update Part
module.exports.updateUser = function(userId, userObj, options, cb) {
  const query = {_id: userId};
  const update = {
    section: userObj.section,
    title: userObj.title,
    description: userObj.description,
    price: userObj.price,
    image: userObj.image,
    tube_color: userObj.tube_color,
    material_color: userObj.material_color,
  };
  // MongoDB Function to execute
  Users.findOneAndUpdate(query, update, options, cb);
}

// DELETE PART
module.exports.deleteUser = function(userId, cb) {
  const query = {_id: userId};
  // MongoDB Function to execute
  Users.remove(query, cb);
}
