const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Analytics route
router.get('/', analyticsController.getAnalytics);

module.exports = router;
