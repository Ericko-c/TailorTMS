const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Notification route
router.post('/', notificationController.sendNotification);

module.exports = router;
