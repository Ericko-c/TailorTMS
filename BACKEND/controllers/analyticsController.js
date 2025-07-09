const Order = require('../models/Order');
const Feedback = require('../models/Feedback');
const Customer = require('../models/Customer');

// Get analytics data
exports.getAnalytics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const activeOrders = await Order.countDocuments({ status: { $ne: 'Done' } });
    const completedOrders = await Order.countDocuments({ status: 'Done' });

    // Tailor performance
    const tailorPerformance = await Feedback.aggregate([
      {
        $group: {
          _id: '$tailorName',
          averageRating: { $avg: '$rating' },
          feedbackCount: { $sum: 1 },
        },
      },
    ]);

    // Weekly trends (using $isoWeek for better accuracy)
    const weeklyTrends = await Order.aggregate([
      {
        $group: {
          _id: { $isoWeek: '$createdAt' },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { '_id': 1 } },
    ]);

    // Customer return rate (average number of orders per customer)
    const customerOrders = await Customer.aggregate([
      {
        $project: {
          orderCount: { $size: { $ifNull: ['$orders', []] } },
        },
      },
    ]);
    const totalCustomers = customerOrders.length;
    const totalCustomerOrders = customerOrders.reduce((sum, c) => sum + c.orderCount, 0);
    const averageReturnRate = totalCustomers > 0 ? (totalCustomerOrders / totalCustomers) : 0;

    res.status(200).json({
      totalOrders,
      activeOrders,
      completedOrders,
      tailorPerformance: tailorPerformance || [],
      weeklyTrends: weeklyTrends || [],
      averageReturnRate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
