const Notification = require('../models/Notification');

// Send Notification
const sendNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    // Save notification to database
    const notification = new Notification({ userId, message, type });
    const savedNotification = await notification.save();

    res.status(201).json({ message: 'Notification sent successfully', notification: savedNotification });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification', error: error.message });
  }
};

// Get Notifications by User
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId });

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

module.exports = { sendNotification, getNotifications };
