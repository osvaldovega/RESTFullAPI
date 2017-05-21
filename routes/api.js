const express           = require('express');
const router            = express.Router();
const controllers       = require('../controllers');

// Authentication Func
function isAuthenticated(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

// GET route to add a new user/part form
router.get('/home', isAuthenticated, function(req, res) {
  res.render('home', { title: 'Welcome', message: 'This is your home page'});
});

// -------------------------------------------------------- //
// FOR PARTSSCHEMA
// METHOD: GET
// OPTIONS: Get All records
// -------------------------------------------------------- //
router.get('/:resource', isAuthenticated, function(req, res, next) {
  const resource = req.params.resource;
  const controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmantion: 'Fail',
      message: `Invalid resource request: ${resource}`
    });
    return;
  }

  // Call the controller function to trigger
  controller.find(req.query, function(err, results) {
    if (err) {
      res.json({
        confirmantion: 'Fail',
        message: err
      });
      return;
    }

    res.json({
      confirmantion: 'Success',
      resource: results
    });
  });
});

// -------------------------------------------------------- //
// FOR PARTSSCHEMA
// METHOD: GET
// OPTIONS: USING ID
// -------------------------------------------------------- //
router.get('/:resource/:id', isAuthenticated, function(req, res, next) {
  const resource = req.params.resource;
  const id = req.params.id;
  const controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmantion: 'Fail',
      message: `Invalid resource request: ${resource}`
    });
    return;
  }

  // Call the controller function to trigger
  controller.findById(id, function(err, result) {
    if (err) {
      res.json({
        confirmantion: 'Fail',
        message: 'Not Found. ' + err
      });
      return;
    }

    res.json({
      confirmantion: 'Success',
      resource: result
    });
  });
});

// -------------------------------------------------------- //
// FOR PARTSSCHEMA
// METHOD: POST
// OPTIONS: Add New record
// -------------------------------------------------------- //
router.post('/:resource/', isAuthenticated, function(req, res, next) {
  const resource = req.params.resource;
  const controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmantion: 'Fail',
      message: `Invalid resource request: ${resource}`
    });
    return;
  }

  // Call the controller function to trigger
  controller.create(req.body, function(err, result) {
    if (err) {
      res.json({
        confirmantion: 'Fail',
        message: err
      });
      return;
    }

    res.json({
      confirmantion: 'Success',
      resource: result
    });
  });
});

// -------------------------------------------------------- //
// FOR PARTSSCHEMA
// METHOD: PUT
// OPTIONS: Update a record
// -------------------------------------------------------- //
router.put('/:resource/:id', isAuthenticated, function(req, res, next) {
  const resource = req.params.resource;
  const controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmantion: 'Fail',
      message: `Invalid resource request: ${resource}`
    });
    return;
  }

  // Call the controller function to trigger
  controller.create(req.body, function(err, result) {
    if (err) {
      res.json({
        confirmantion: 'Fail',
        message: err
      });
      return;
    }

    res.json({
      confirmantion: 'Success',
      resource: result
    });
  });
});

// -------------------------------------------------------- //
// FOR PARTSSCHEMA
// METHOD: DELETE
// OPTIONS: Delete a record
// -------------------------------------------------------- //
router.delete('/:resource/:id', isAuthenticated, function(req, res, next) {
  const resource = req.params.resource;
  const controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmantion: 'Fail',
      message: `Invalid resource request: ${resource}`
    });
    return;
  }

  // Call the controller function to trigger
  controller.delete(req.params.id, function(err, result) {
    if (err) {
      res.json({
        confirmantion: 'Fail',
        message: err
      });
      return;
    }

    res.json({
      confirmantion: 'Success',
      resource: result
    });
  });
});

// GET route to add a new user/part form
router.get('/:resource/add', isAuthenticated, function(req, res) {
  const resource = req.params.resource;

  if(resource === 'users') {
    res.render('adduser', null);
  }

  res.render('addpart', null);
});

module.exports = router;
