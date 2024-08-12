const express = require("express");
const route = express.Router();
const OrderController = require("../controller/ordersController");

const orderController = new OrderController();

route.get("/orders/", orderController.allOrder);
route.get("/order/:id", orderController.singleOrder);
route.get("/order/customer/:customerId", orderController.customerOrders);
route.post("/checkout", orderController.createOrder);
route.delete('/order/:id', orderController.deleteOrders)

module.exports = route;