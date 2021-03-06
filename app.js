var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//var Mutex = require('async-mutex').Mutex;
//var Semaphore = require('async-mutex').Semaphore;
//var withTimeout = require('async-mutex').withTimeout;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//*** JOBS */
//const semaphore = new Semaphore(1);  // 1 maximum concurrent consumer
var MySemaphore = require('./api/semaphore');
var semaphore = new MySemaphore().getInstance();

var job5s = require('./api/job5s');
job5s.start(semaphore.getA());
var job10s = require('./api/job10s');
job10s.start(semaphore.getA());


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
  res.render('error');
});

module.exports = app;
