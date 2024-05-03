const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carts: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true },
    selectOption: { type: String, required: false },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);