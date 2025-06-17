const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');

// Measurement routes
router.post('/', measurementController.addMeasurement);
router.get('/customer/:customerId', measurementController.getMeasurementsByCustomerId);
router.put('/:id', measurementController.updateMeasurement);
router.delete('/:id', measurementController.deleteMeasurement);

module.exports = router;
