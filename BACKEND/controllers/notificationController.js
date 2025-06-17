// Simulated notification controller
exports.sendNotification = async (req, res) => {
  try {
    const { message, recipient } = req.body;
    // Simulate sending a notification
    console.log(`Notification sent to ${recipient}: ${message}`);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
