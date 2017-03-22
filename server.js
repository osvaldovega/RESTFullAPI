const express         = require('express');
const path            = require('path');
const bodyParser      = require('body-parser');
const favicon         = require('serve-favicon');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const mongoose        = require('mongoose');
// Routes
const index           = require('./routes/index');
const api           = require('./routes/api');
// Server variables
const config          = require('./config/config');
const app             = express();
const port            = config.port || 3000;



// Connect to Mongo DB - (store)
mongoose.connect(config.database.path, function(err, res) {
  if (err) {
    console.log(`DB CONNECTION FAILED: ${err}`);
  } else {
    console.log(`DB CONNECTION SUCCESS: ${config.database.path}`);
  }
});


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use(index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// START THE SERVER
app.listen(port, function() {
  console.log(`Server is up and running...\nPort: ${port}\nURL: localhost:${port}/`);
});
