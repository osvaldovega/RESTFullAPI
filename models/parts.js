const mongoose = require('mongoose');

// PARTS SCHEMA - MODEL
const partsSchema = new mongoose.Schema({
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

module.exports = mongoose.model('partsSchema', partsSchema);
