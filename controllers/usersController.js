const Users = require('../models/Users');

module.exports = {

  // Get ALL the users
  find: function(params, callback) {
    Users.find(params, function(err, user) {
      if(err) {
        callback(err, null);
        return;
      }

      callback(null, user);
    });
  },

  // Get just ONE user
  findById: function(id, callback) {
    Users.findById(id, function(err, user) {
      if(err) {
        callback(err, null);
        return;
      }

      callback(null, user);
    });
  },

  // Add a NEW user
  create: function(params, callback) {
    Users.create(params, function(err, user) {
      if(err) {
        callback(err, null);
        return;
      }

      callback(null, user);
    });
  },

  // Update an user
  update: function(id, params, callback) {
    Users.findByIdAndUpdate(id, params, {new:true}, function(err, part) {
      if(err) {
        callback(err, null);
        return;
      }

      callback(null, user);
    });
  },

  // Delete an user
  delete: function(id, callback) {
    Users.findByIdAndRemove(id, function(err, user) {
      if(err) {
        callback(err, null);
        return;
      }

      callback(null, null);
    });
  },
}
