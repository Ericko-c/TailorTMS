const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { check, validationResult } = require('express-validator');

// Customer routes
router.post(
  '/',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('contact').notEmpty().withMessage('Contact is required'),
    check('measurements').isObject().withMessage('Measurements must be provided'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  customerController.addCustomer
);
router.get('/', customerController.getCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
