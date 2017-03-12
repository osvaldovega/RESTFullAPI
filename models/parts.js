const mongoose = require('mongoose');

// PARTS SCHEMA - MODEL
const partsSchema = mongoose.Schema({
  section:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  tube_color:{
    type: Array,
    required: false
  },
  material_color:{
    type: Array,
    required: false
  },
  image:{
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

const Parts = module.exports = mongoose.model('Parts', partsSchema);

// MONGODB FUNCTIONS - PARTS SCHEMA

// Get Parts
module.exports.getAllParts = function(cb, limit) {
  // MongoDB Function to execute
  Parts.find(cb).limit(limit);
}

// Get a part
module.exports.getPartById = function(partId, cb) {
  // MongoDB Function to execute
  Parts.findById(partId, cb);
}

// Add part
module.exports.addPart = function(partObj, cb) {
  // MongoDB Function to execute
  Parts.create(partObj, cb);
}

// Update Part
module.exports.updatePart = function(partId, partObj, options, cb) {
  const query = {_id: partId};
  const update = {
    section: partObj.section,
    title: partObj.title,
    description: partObj.description,
    price: partObj.price,
    image: partObj.image,
    tube_color: partObj.tube_color,
    material_color: partObj.material_color,
  };
  // MongoDB Function to execute
  Parts.findOneAndUpdate(query, update, options, cb);
}

// DELETE PART
module.exports.deletePart = function(partId, cb) {
  const query = {_id: partId};
  // MongoDB Function to execute
  Parts.remove(query, cb);
}
