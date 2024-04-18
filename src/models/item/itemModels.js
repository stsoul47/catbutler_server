const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  category: {type: String, required: true}, 
  productName: {type: String, required: true},
  price: {type: Number, required: true},
  deliveryFee: {type: Number, required: false, default: 0},
  option: {type: Array, required: true},
  mainImage: {type: Array, required: true},
  requiredInfo: {
    modelName: {type: String, required: false, default: null},    
    power: {type: String, required: false, default: null},
    manufacturer: {type: String, required: false, default: null},
    size: {type: String, required: false, default: null},
    specification: {type: String, required: false, default: null},
    asInfo: {type: String, required: false, default: null},
    kcInfo: {type: String, required: false, default: null},
    releaseDate: {type: String, required: false, default: null},
    country: {type: String, required: false, default: null},
    weight: {type: String, required: false, default: null},
    quality: {type: String, required: false, default: null},
  },
  detailImage: {type: Array, required: true},
  deleteTime: {type: Date, required: false, default: null},
  isVisible: {type: Number, required: true, default: 1},
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);