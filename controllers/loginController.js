const Users = require('../models/Users');

module.exports = {

  // Find user by username and password
  findOne: function(user, callback) {
    Users.findOne(user, function(err, user) {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, user);
    });
  }
};
