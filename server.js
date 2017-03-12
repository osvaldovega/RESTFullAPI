const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const Parts       = require('./models/parts');
const config      = require('./config/database');
const app         = express();
const port        = 3000;

// Connect to Mongo DB - (store)
mongoose.connect(config.database);
const DB = mongoose.connection;

// Express
app.use(bodyParser.json());


/*----------------------- ROUTES ---------------------------------------*/
// ROOT URL
app.get('/', (req, res) => {
  res.send('Welcome to Express API...');
});


// GET - All parts
app.get('/api/parts', (req, res) => {
  Parts.getAllParts((err, parts) => {
    if(err) {
      throw err;
    }
    res.json(parts);
  });
});

// GET -  Specific part by ID
app.get('/api/parts/:_id', (req, res) => {
  Parts.getPartById(req.params._id, (err, part) => {
    if(err) {
      throw err;
    }
    res.json(part);
  });
});

// ADD - Add a new part
app.post('/api/parts', (req, res) => {
  const newPart = req.body;
  Parts.addPart(newPart, (err, part) => {
    if(err) {
      throw err;
    }
    res.json(part);
  });
});

// UPDATE - Update a existing part by ID
app.put('/api/parts/:_id', (req, res) => {
  const id = req.params._id;
  const part = req.body;
  Parts.updatePart(id, part, {}, (err, part) => {
    if(err) {
      throw err;
    }
    res.json(part);
  });
});

// DELETE - Delete a part by ID
app.delete('/api/parts/:_id', (req, res) => {
  const id = req.params._id;
  Parts.deletePart(id, (err, part) => {
    if(err) {
      throw err;
    }
    res.json(part);
  });
});

/*----------------------- END ---------------------------------------*/

app.listen(port);
console.log(`Server is up and running...\nPort: ${port}\nURL: localhost:${port}/`);
