const mongoose = require('mongoose');
const deliveryListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  
}, { timestamps: true });