const express = require("express");
const route = express.Router();
const PaymentController = require("../controller/paymentController");

const paymentController = new PaymentController();

route.post('/initialize', paymentController.initializePayment);
route.get('/verify', paymentController.verifyPaymentLogic);

module.exports = route;