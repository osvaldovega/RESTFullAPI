const LocalStrategy = require('passport-local').Strategy;
const Users         = require('../models/Users');
const bCrypt        = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({ passReqToCallback : true }, function(req, username, password, done) {

      // check in mongo if a user with username exists or not
      Users.findOne({ 'username' :  username },
          function(err, user) {
              if (err)
                  return done(err);
              // Username does not exist, log the error and redirect back
              if (!user){
                  // console.log(`User not found ${username}`);
                  return done(null, false, req.flash('message', 'User Not found...'));
              }
              // User exists but wrong password, log the error
              if (!isValidPassword(user, password)){
                  // console.log('Invalid Password...');
                  return done(null, false, req.flash('message', 'Invalid Password...')); // redirect back to login page
              }
              // User and password both match, return user from done method
              // which will be treated like success
              return done(null, user);
          }
			);
    })
  );

  function isValidPassword(user, password){
    return bCrypt.compareSync(password, user.password);
  }
}
