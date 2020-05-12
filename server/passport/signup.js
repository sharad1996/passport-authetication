const LocalStrategy   = require('passport-local').Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
    function(req, username, password, done) {
      findOrCreateUser = function(){
        // find a user in MongoDB with provided username
        console.log(username);
        User.findOne({ 'username' :  username }, function(err, user) {
          // In case of any error occure
          if (err) {
            console.log('Error in SignUp: '+err);
            return done(err);
          }
          //User already exists
          if (user) {
            console.log('User already exists with username: '+username);
            return done(null, false, {message: 'User Already Exists' });
          }
          else {
            const newUser = new User();

            newUser.name = req.param('name');
            newUser.username = username;
            newUser.email = req.param('email');
            newUser.password = createHash(password);
            newUser.phoneNumber = req.param('phoneNumber');

            // save the user
            newUser.save(function(err) {
              if (err){
                console.log('Error in Saving user: '+err);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser , {message: 'signup succesful'});
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
  const createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

}