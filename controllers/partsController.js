const Parts = require('../models/Parts');

module.exports = {

  // Get ALL the parts
  find: function(params, callback) {
    Parts.find(params, function(err, parts) {
      if(err) {
        callback(err, null);
        return;
      }

      callback(null, parts);
    });
  },

  // Get just ONE part
  findById: function(id, callback) {
    Parts.findById(id, function(err, part) {
      if(err) {
        callback(err, null);
        return;
      }

      callback(null, part);
    });
  },

  // Add a NEW part
  create: function(params, callback) {
    // Convert to Arrays
    let materialColor = params['material_color'].split(',');
    let tubeColor = params['tube_color'].split(',');
    let newMaterialColor = [];
    let newTubeColor = [];

    materialColor.forEach(function(element) {
      newMaterialColor.push(element.trim());
    });
    tubeColor.forEach(function(element) {
      newTubeColor.push(element.trim());
    });

    params['material_color'] = newMaterialColor;
    params['tube_color'] = newTubeColor;

    Parts.create(params, function(err, part) {
      if(err) {
        callback(err, null);
        return;
      }

      callback(null, part);
    });
  },

  // Update a part
  update: function(id, params, callback) {
    Parts.findByIdAndUpdate(id, params, {new:true}, function(err, part) {
      if(err) {
        callback(err, null);
        return;
      }

      callback(null, part);
    });
  },

  // Delete a part
  delete: function(id, callback) {
    Parts.findByIdAndRemove(id, function(err, part) {
      if(err) {
        callback(err, null);
        return;
      }

      callback(null, null);
    });
  },
}
