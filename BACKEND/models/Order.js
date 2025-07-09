const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'Cutting', 'Sewing', 'Final Touches', 'Done'],
    default: 'New',
  },
  priority: {
    type: String,
    enum: ['Normal', 'Urgent'],
    default: 'Normal',
  },
  assignedTailor: {
    type: String,
  },
  timestamps: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
