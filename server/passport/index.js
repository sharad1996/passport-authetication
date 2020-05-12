const express = require("express");
const User = require('../models/user').User;
const passport = require('passport');
const login = require('./login');
const signup = require('./signup');

module.exports = function(passport){
  //take user id for server side session login
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
  //session logout
  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  // use these strategies
  login(passport);
  signup(passport);
}
