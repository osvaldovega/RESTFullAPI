const Users   = require('../models/Users');
const Login   = require('./login');
const Signup  = require('./signup');

module.exports = function(passport) {

  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
      console.log('serializing user: ');
      console.log(user);
      done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
      Users.findById(id, function(err, user) {
          console.log(`deserializing ${user}`);
          done(err, user);
      });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  Login(passport);
  Signup(passport);
};
