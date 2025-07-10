const express = require("express");
const { userSignup } = require("./controllers/userSignup");
const { userSignin } = require("./controllers/userSignin");
const { requestOTP } = require("./controllers/requestOTP");
const { resetPassword } = require("./controllers/resetPassword");
const { placeOrder, getOrdersByStatus, updateOrder, getAllOrders, getTotalAmount, getOrdersByMonth } = require("./controllers/ordersController");
const { sendSMS } = require("./controllers/smsController");
const router = express.Router();

// Auth routes
router.post("/users/signup/", userSignup);
router.post("/users/signin/", userSignin);
router.post("/users/requestOTP/",requestOTP);
router.post("/users/resetPassword/",resetPassword);

// orders
router.post("/orders/create/",placeOrder);
router.get("/orders/status/:status",getOrdersByStatus);
router.patch("/orders/:id/update/",updateOrder);
router.get("/orders/all/",getAllOrders);
router.get("/orders/totalAmount/",getTotalAmount);
router.get("/orders/:month/:year/",getOrdersByMonth);

// sms
router.post("/sms/send/",sendSMS);
module.exports = router;
