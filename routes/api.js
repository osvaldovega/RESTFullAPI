const express           = require('express');
const router            = express.Router();
const controllers       = require('../controllers');


// -------------------------------------------------------- //
// FOR PARTSSCHEMA
// METHOD: GET
// OPTIONS: Get All records
// -------------------------------------------------------- //
router.get('/:resource', function(req, res, next) {
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
router.get('/:resource/:id', function(req, res, next) {
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
router.post('/:resource/', function(req, res, next) {
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
router.put('/:resource/:id', function(req, res, next) {
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
router.delete('/:resource/:id', function(req, res, next) {
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

module.exports = router;
