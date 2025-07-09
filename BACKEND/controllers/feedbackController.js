const { validationResult } = require('express-validator');
const Feedback = require('../models/Feedback');

// Add feedback
exports.addFeedback = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const { orderId, tailorName, rating, comment } = req.body;
    const feedback = new Feedback({ orderId, tailorName, rating, comment });
    await feedback.save();
    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get feedback by order ID
exports.getFeedbackByOrderId = async (req, res) => {
  try {
    const feedback = await Feedback.find({ orderId: req.params.orderId });
    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const { orderId, tailorName, rating, comment } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { orderId, tailorName, rating, comment },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ success: false, error: 'Feedback not found' });
    }
    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, error: 'Feedback not found' });
    }
    res.status(200).json({ success: true, data: { message: 'Feedback deleted successfully' } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
