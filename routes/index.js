const express     = require('express');
const router      = express.Router();
const sessions    = require('express-session');
const controllers = require('../controllers');

/*----------------------- ROUTES ---------------------------------------*/
// ROOT URL
router.get('/', function(req, res) {
  res.render('index', { title: 'RESTFull API - Express' });
});

router.get('/api', function(req, res) {
  res.render('index', { title: 'RESTFull API - Express' });
});

// GET route to load the add part form
router.get('/addpart', function(req, res) {
  res.render('addpart', null);
});

// GET route to load the user form
router.get('/adduser', function(req, res) {
  res.render('adduser', null);
});

// Login to the API
router.get('/login', function(req, res) {
  res.render('login', null);
});

// Login to the API
router.post('/login', function(req, res) {
  const controller = controllers['login'];
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  controller.findOne(user, function(err, results) {
    if (err) {
      res.status(500);
      return res.render('error', { title:'Error', message:`Error getting data ${err}` });
    }

    if(!results) {
      res.status(404);
      return res.render('error', { title:'Error', message:'No user found' });
    }

    res.status(200);
    return res.render('home', { title:'Home', message:`User: ${results.username}` });

  });
});

module.exports = router;
