const LocalStrategy = require('passport-local').Strategy;
const Users         = require('../models/Users');
const bCrypt        = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({ passReqToCallback : true }, function(req, username, password, done) {

        findOrCreateUser = function(){
            // First check if user exists
            Users.findOne({ 'username' :  username }, function(err, user) {
                if (err){
                    // console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // If user already exists
                if (user) {
                    // console.log('User already exists with username: ' + username);
                    return done(null, false, req.flash('message','User Already Exists'));
                } else {
                  // if there is no user with that email
                  // create the user
                  let newUser = new Users();
                  newUser.username = req.body.username;
                  newUser.password = createHash(req.body.password);
                  newUser.email = req.body.email;

                  // save the user
                  newUser.save(function(err) {
                      if (err){
                          // console.log(`Error creating a new user: ${err}`);
                          throw err;
                      }
                      // console.log('User Registration succesful');
                      return done(null, newUser);
                  });
                }
            });
        };
        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop
        process.nextTick(findOrCreateUser);
      })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
