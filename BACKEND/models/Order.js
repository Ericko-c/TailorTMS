const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  clientPhoneNo: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  measurements: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["placed", "inprogress", "done", "picked"],
    default: "placed",
  },
  urgency: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "high",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
