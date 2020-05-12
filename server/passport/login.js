const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  },
    function(req, username, password, done) {
      User.findOne({ 'username' :  username },
        function(err, user) {
          if (err) {
            return done(err);
          }
          // Username does not exist,
          if (!user) {
            return done(null, false, {message: 'User Not Found with username' });
          }
          // User exists but wrong password,
          if (!isValidPassword(user, password)) {
            return done(null, false, {message: 'Entered Invalid Password' } ); // redirect back to login page
          }
          return done(null, user, {message: 'login successful' });
        }
      );
    })
  );

  const isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
  }

}
