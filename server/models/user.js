const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  phoneNumber: String
});

module.exports = mongoose.model('Users', UserSchema ,'users');
