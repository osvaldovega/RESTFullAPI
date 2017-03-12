const express   = require('express');
const router    = express.Router();
const Users     = require('./../models/users');

// GET - All users
router.get('/users', (req, res) => {
  Users.getAllUsers((err, users) => {
    if(err) {
      res.status(400)
      res.send(err)
    }
    res.json(users);
  });
});

// GET -  Specific user by ID
router.get('/users/:_id', (req, res) => {
  Users.getUserById(req.params._id, (err, part) => {
    if(err) {
      res.status(400)
      res.send(err)
    }
    res.json(part);
  });
});

// ADD - Add a new user
router.post('/users', (req, res) => {
  const newPart = req.body;
  Users.addUser(newPart, (err, part) => {
    if(err) {
      res.status(400)
      res.send(err)
    }
    res.json(part);
  });
});

// UPDATE - Update a existing user by ID
router.put('/users/:_id', (req, res) => {
  const id = req.params._id;
  const part = req.body;
  Users.updateUser(id, part, {}, (err, part) => {
    if(err) {
      res.status(400)
      res.send(err)
    }
    res.json(part);
  });
});

// DELETE - Delete am user by ID
router.delete('/users/:_id', (req, res) => {
  const id = req.params._id;
  Users.deleteUser(id, (err, part) => {
    if(err) {
      res.status(400)
      res.send(err)
    }
    res.json(part);
  });
});

module.exports = router;
