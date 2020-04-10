var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const public = require('./routes/public');
const auth = require('./routes/auth');

const dotenv = require('dotenv');
dotenv.config();

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1', public);

const jwtSecret = 'vehicles-api';
app.use('/api/v1/auth', jwt({ secret: jwtSecret }), auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message : err.message
  });
});

mongoose.connect("mongodb+srv://ps0_system:vehicles@cluster0-azyhh.mongodb.net/test?retryWrites=true&w=majority", { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', function (err) {
    console.log('Mongodb connection error: ', err);
    process.exit(1);
});

module.exports = app;
