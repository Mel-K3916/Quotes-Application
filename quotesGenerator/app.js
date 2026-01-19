var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); //change to jade/hbs as per file extension

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//required for passport to maintain user state/data
app.use(
  session({
    secret: 'APP_SECRET',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize()) //initialize passport
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, 'public'))); //set static files / assets directory

app.use('/', indexRouter);
app.use('/users', usersRouter);

// handle authentication failure error messages
app.use(function(req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash("error", req.query.error);
  }

  if (req && req.query && req.query.error_description) {
    req.flash("error_description", req.query.error_description);
  }
  next();
});

// check logged in
app.use(function(err, req, res, next) {
  res.locals.loggedIn = false;
  if (req.session.passport && typeof req.session.passport.user != 'undefined') {
    res.locals.loggedIn = true;
  }
  next();
});

module.exports = app;

//hbs set up for templating
app.set('view engine', 'hbs');