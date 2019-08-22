var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var scheduleRouter = require('./routes/schedule');
var notFoundRoute = require('./routes/404');
var registerRouter = require('./routes/register');
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(indexRouter);
app.use(usersRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(scheduleRouter);
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
