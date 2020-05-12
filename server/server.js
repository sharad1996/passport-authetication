const express = require("express");
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./config.js')
const app = express();
const port = process.env.PORT || 3008;

app.use(cors());
app.use(cookieParser());
app.use(expressSession({secret:'secretData'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log('sample application for passport authentication');
  next();
});

app.options('*', cors());
//cors handling
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

  next();

});

app.listen(port);
console.log('Connected with port ' + port);

module.exports=app;