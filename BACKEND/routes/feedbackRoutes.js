const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Feedback routes
router.post('/', feedbackController.addFeedback);
router.get('/order/:orderId', feedbackController.getFeedbackByOrderId);
router.get('/', feedbackController.getAllFeedback);

module.exports = router;
