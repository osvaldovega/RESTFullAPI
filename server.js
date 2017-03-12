const express         = require('express');
const path            = require('path');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
// controllers
const homeController  = require('./controllers/homeController');
const partsController = require('./controllers/partsController');
// Server variables
const config          = require('./config/database');
const app             = express();
const port            = 3000;



// Connect to Mongo DB - (store)
mongoose.connect(config.database);
const DB = mongoose.connection;

// Configure the server
app.set('view engine', 'pug'); // the views will use the pug file type/ext
app.set('views', path.join(__dirname, 'views')); // where is located the views folder

// Use Midlewares
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Define routes
app.use(homeController);
app.use('/api', partsController);

// START THE SERVER
app.listen(port, function() {
  console.log(`Server is up and running...\nPort: ${port}\nURL: localhost:${port}/`);
});
