const express = require('express');
const router = express.Router();
const { sendNotification, getNotifications } = require('../controllers/notificationController');

// Routes
router.post('/send', sendNotification);           // Send a notification
router.get('/:userId', getNotifications);         // Get notifications for a user

module.exports = router;
