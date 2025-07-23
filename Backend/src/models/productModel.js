const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  actual_price: {
    type: Number,
    required: true,
  },
  selling_price: {
    type: Number,
    required: true,
  },
  brand: String,
  model: String,
  color: String,
  form_factor: String,
  connectivity_type: String,
  image: String, 
  category: [String], 
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
