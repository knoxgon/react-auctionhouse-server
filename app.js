var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./company/index');
var clientRouter = require('./company/client');
var companyRouter = require('./company/company');
var loginRouter = require('./company/login');
var clinput = require('./company/clinput');
var scheduleRouter = require('./company/schedule');
var notFoundRoute = require('./company/404');
var registerRouter = require('./company/register');
var bodyParser = require('body-parser');

var app = express();

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


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use(indexRouter);
app.use(clientRouter);
app.use(companyRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(scheduleRouter);
app.use(clinput);
app.use('**', notFoundRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  createError(404);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (!err.status) {
    err.status = 500
  }

  // render the error page
  res.status(err.status).json({ error: err.message });
});

module.exports = app;
