const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    let { clientName, clientPhoneNo, measurements, amount, status, urgency } =
      req.body;

    clientName = clientName.trim().toLowerCase();
    status = (status || "placed").trim().toLowerCase();
    urgency = (urgency || "high").trim().toLowerCase();

    const newOrder = new Order({
      clientName,
      clientPhoneNo,
      measurements,
      amount,
      status: "placed",
      urgency: "high",
    });

    const placedOrder = await newOrder.save();

    return res.status(200).json({
      message: "Order placed successfully!",
      order: placedOrder,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get All orders

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Orders fetched successfully!",
      orders,
      totalOrders: orders.length,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get order by Id
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Order fetched successfully!",
      order,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// update order status
const updateOrder = async (req, res) => {
  let { id } = req.params;
  let { newStatus } = req.body;
  const validStatus = ["placed", "inprogress", "done", "picked"];
  if (!validStatus.includes(newStatus)) {
    return res.status(400).json({
      message: "Invalid order status",
      sucess: false,
    });
  }

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get orders by status
const getOrdersByStatus = async (req, res) => {
  const {status} = req.params;

  try {
    const Orders = await Order.find({
      status: status,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Orders for fetched successfully!",
      Orders,
      totalOrders: Orders.length,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// get total amount raised from orders
const getTotalAmount = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);

    return res.status(200).json({
      message: "Total amount calculated successfully!",
      totalAmount,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// get orders by month
const getOrdersByMonth = async (req, res) => {
  const { month, year } = req.params;

  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);

  if (monthInt < 1 || monthInt > 12 || yearInt < 2000) {
    return res.status(400).json({
      message: "Invalid month or year",
      success: false,
    });
  }

  try {
    const orders = await Order.find({
      createdAt: {
        $gte: new Date(yearInt, monthInt - 1, 1),
        $lt: new Date(yearInt, monthInt, 1),
      },
    });

    return res.status(200).json({
      message: "Orders for the specified month fetched successfully!",
      orders,
      totalOrders: orders.length,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  getOrdersByStatus,
  getOrdersByMonth,
  getTotalAmount,
};
