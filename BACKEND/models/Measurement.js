const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  chest: {
    type: Number,
    required: true,
  },
  waist: {
    type: Number,
    required: true,
  },
  hips: {
    type: Number,
    required: true,
  },
  sleeve: {
    type: Number,
    required: true,
  },
  inseam: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Measurement', measurementSchema);
