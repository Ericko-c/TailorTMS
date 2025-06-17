const Order = require('../models/Order');
const Feedback = require('../models/Feedback');
const Customer = require('../models/Customer');

// Get analytics data
exports.getAnalytics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const activeOrders = await Order.countDocuments({ status: { $ne: 'Done' } });
    const completedOrders = await Order.countDocuments({ status: 'Done' });

    const tailorPerformance = await Feedback.aggregate([
      {
        $group: {
          _id: '$tailorName',
          averageRating: { $avg: '$rating' },
          feedbackCount: { $sum: 1 },
        },
      },
    ]);

    const weeklyTrends = await Order.aggregate([
      {
        $group: {
          _id: { $week: '$createdAt' },
          orderCount: { $sum: 1 },
        },
      },
    ]);

    const customerReturnRate = await Customer.aggregate([
      {
        $project: {
          returnRate: { $size: '$orders' },
        },
      },
    ]);

    res.status(200).json({
      totalOrders,
      activeOrders,
      completedOrders,
      tailorPerformance,
      weeklyTrends,
      customerReturnRate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
