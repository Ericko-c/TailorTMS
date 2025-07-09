const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    sleeve: Number,
    inseam: Number,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
