import express from "express";
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config.js'

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

//api use by user to call server
app.use('/api', require('./routes/user'));

app.listen(port);
console.log('Connected with port ' + port);

module.exports=app;
