var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  idpLogout: true,
  secret: '7382947293847293847239847293847_LONG_SECRET_KEY',
  baseURL: 'http://localhost:3000',
  clientID: 'yOPebGxr3edEpZPKGgABfC5ELcOCq5tL',
  issuerBaseURL: 'https://dev-8pm5r6zsyat2h5rh.us.auth0.com'
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Auth0
app.use(auth(config));

// Custom middleware to pass user data to templates
app.use(function(req, res, next){
  res.locals.user = req.oidc.user;
  res.locals.isAuthenticated = req.oidc.isAuthenticated();
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;