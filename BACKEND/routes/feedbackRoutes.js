const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { check, validationResult } = require('express-validator');
const authenticateJWT = require('../middleware/authenticateJWT');

// Feedback routes
router.post(
  '/',
  authenticateJWT,
  [
    check('orderId').notEmpty().withMessage('Order ID is required'),
    check('tailorName').notEmpty().withMessage('Tailor name is required'),
    check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  feedbackController.addFeedback
);
router.get('/order/:orderId', feedbackController.getFeedbackByOrderId);
router.get('/', feedbackController.getAllFeedback);
router.put(
  '/:id',
  authenticateJWT,
  [
    check('orderId').notEmpty().withMessage('Order ID is required'),
    check('tailorName').notEmpty().withMessage('Tailor name is required'),
    check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  feedbackController.updateFeedback
);
router.delete('/:id', authenticateJWT, feedbackController.deleteFeedback);

module.exports = router;
