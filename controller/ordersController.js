const {createOrderLogic, fetchAllOrders, fetchSingleOrder, deleteOrder, customersOrder} = require("../businessLogics/orderLogic");
const asyncHandler = require("express-async-handler");

class OrderController {
    createOrder = asyncHandler(async (req, res) => {
        await createOrderLogic(req, res);
    })
    allOrder = asyncHandler(async (req, res) => {
        await fetchAllOrders(req, res);
    })
    singleOrder = asyncHandler(async (req, res) => {
        await fetchSingleOrder(req, res)
    })
    deleteOrders = asyncHandler(async (req, res) => {
        await deleteOrder(req, res)
    })
    customerOrders = asyncHandler(async (req, res) => {
        await customersOrder(req, res)
    })
}

module.exports = OrderController;