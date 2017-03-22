const express   = require('express');
const router    = express.Router();

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

module.exports = router;
