const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { check, validationResult } = require('express-validator');

// Routes for managing payments
router.post('/', [
    check('customerId').notEmpty().withMessage('Customer ID is required'),
    check('amount').isNumeric().withMessage('Amount must be a number'),
    check('method').isIn(['Cash', 'Card', 'Online']).withMessage('Invalid payment method'),
    check('status').isIn(['Paid', 'Unpaid']).withMessage('Invalid payment status')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, paymentController.createPayment);
router.get('/', paymentController.getPayments);
router.get('/:id', paymentController.getPaymentById);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
