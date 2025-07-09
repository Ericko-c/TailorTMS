const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { check, validationResult } = require('express-validator');

// Order routes
router.post(
  '/',
  [
    check('customerId').notEmpty().withMessage('Customer ID is required'),
    check('status').isIn(['New', 'Cutting', 'Sewing', 'Final Touches', 'Done']).withMessage('Invalid status'),
    check('priority').isIn(['Normal', 'Urgent']).withMessage('Invalid priority'),
    check('assignedTailor').notEmpty().withMessage('Assigned tailor is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  orderController.addOrder
);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
