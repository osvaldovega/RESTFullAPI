const express         = require('express');
const mongoose        = require('mongoose');
const path            = require('path');
const bodyParser      = require('body-parser');
const favicon         = require('serve-favicon');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const expressSession  = require('express-session');
const passport        = require('passport');
const flash           = require('connect-flash');
// Routes
const index           = require('./routes/index')(passport);
const api             = require('./routes/api');
// Server variables
const config          = require('./config/config');
const port            = config.port;
const secretKey       = config.passport.secretKey;
const initPassport    = require('./passport/init');
const app             = express();



// Connect to Mongo DB - (store)
mongoose.connect(config.database.url, function(err, res) {
  if (err) {
    console.log(`DB CONNECTION FAILED: ${err}`);
  } else {
    console.log(`DB CONNECTION SUCCESS: ${config.database.url}`);
  }
});


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('port', port || 3000);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img/icons', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport security
app.use(expressSession({ secret: secretKey, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// FLASH middleware is used to store messages in session and then display messages in templates
app.use(flash());

// Passport INITIALIZE
initPassport(passport);

// Define routes
app.use(index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;
