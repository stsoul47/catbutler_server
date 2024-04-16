const mongoose = require('mongoose'); 
const reviewSchema = new mongoose.Schema({
  item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: {type: Number, required: true},
  content: {type: String, required: true},
  image: {type: Array, required: false, default: []},
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema);