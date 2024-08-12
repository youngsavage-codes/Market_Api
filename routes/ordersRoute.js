const express = require("express");
const router = express.Router();
const OrderController = require("../controller/ordersController");

const orderController = new OrderController();

router.get("/orders/", orderController.allOrder);
router.get("/order/:id", orderController.singleOrder);
router.get("/order/customer/:customerId", orderController.customerOrders);
router.post("/checkout", orderController.createOrder);
router.delete('/order/:id', orderController.deleteOrders)

module.exports = router;