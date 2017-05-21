const express     = require('express');
const router      = express.Router();
const controllers = require('../controllers');

/*----------------------- ROUTES ---------------------------------------*/

module.exports = function(passport) {

  // ROOT URL
  router.get('/', function(req, res) {
    res.render('index', { title: 'RESTFull API - Express' });
  });

  router.get('/api', function(req, res) {
    res.render('index', { title: 'RESTFull API - Express' });
  });

  // LOGIN GET && POST
  router.get('/login', function(req, res) {
    res.render('login', null);
  });

  router.post('/login', passport.authenticate('login', {
		successRedirect: '/api/home',
		failureRedirect: '/',
		failureFlash : true
	}));

  // SINGUP GET && POST
  router.get('/signup', function(req, res) {
    res.render('register', { message: req.flash('message')})
  });

  router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/api/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

  router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

  return router;
}
