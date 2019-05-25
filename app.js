var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var uuid = require('uuid');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var notFoundRoute  = require('./routes/404');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({
  strict: false
}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  genid: uuid.v4,
  secret: 'myTempSecKey',
  resave: false,
  saveUninitialized: true
}));


app.use(indexRouter);
app.use(usersRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use('**', notFoundRoute);

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
  res.json({ error: err })
});

module.exports = app;
