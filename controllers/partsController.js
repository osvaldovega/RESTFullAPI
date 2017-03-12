const express   = require('express');
const router    = express.Router();
const Parts     = require('./../models/parts');

// GET - All parts
router.get('/parts', (req, res) => {
  Parts.getAllParts((err, parts) => {
    if(err) {
      throw err;
    }
    res.json(parts);
  });
});

// GET -  Specific part by ID
router.get('/parts/:_id', (req, res) => {
  Parts.getPartById(req.params._id, (err, part) => {
    if(err) {
      throw err;
    }
    res.json(part);
  });
});

// ADD - Add a new part
router.post('/parts', (req, res) => {
  const newPart = req.body;
  Parts.addPart(newPart, (err, part) => {
    if(err) {
      throw err;
    }
    res.json(part);
  });
});

// UPDATE - Update a existing part by ID
router.put('/parts/:_id', (req, res) => {
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
router.delete('/parts/:_id', (req, res) => {
  const id = req.params._id;
  Parts.deletePart(id, (err, part) => {
    if(err) {
      throw err;
    }
    res.json(part);
  });
});

module.exports = router;
