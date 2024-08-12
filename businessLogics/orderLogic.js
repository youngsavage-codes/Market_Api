const OrderService = require("../services/ordersService");
const mongoose = require("mongoose");

const ordersService = new OrderService();

const createOrderLogic = async (req, res) => {
  try {
    // Validate request body
    const { customer, orderItems, shippingAddress, paymentInfo, orderStatus, shippingPrice } = req.body;

    if (!customer || !orderItems || !shippingAddress || !paymentInfo || !orderStatus || !shippingPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create order data object
    const orderData = {
      customer,
      orderItems,
      shippingAddress,
      paymentInfo,
      orderStatus,
      totalPrice,
      shippingPrice,
    };

    // Initialize payment with Paystack
    const paymentResult = await ordersService.createOrder(orderData);

    // Respond with the payment URL for the client to complete the payment
    res.status(200).json(paymentResult);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const fetchAllOrders = async (req, res) => {
    try {
        const orders = await ordersService.AllOrders(req, res);
        res.status(200).json({message: "All Orders", orders})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const fetchSingleOrder = async (req, res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id))
        {
          return res.status(400).json({ error: "Invalid order provided" })
        }
        const singleOrder = await ordersService.singleOrder(id);
        res.status(200).json({message: "Order", singleOrder})
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
}

const deleteOrder = async (req, res) => {
  try {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
      return res.status(400).json({ error: "Invalid product ID provided" })
    }
    const deleteOrder = await ordersService.deleteOrder(id);
    res.status(200).json({message: "Order", deleteOrder})
  } 
  catch(err)
  {
    res.status(500).json({ message: err.message });
  }
}

const customersOrder = async (req, res) => {
  try {
    const { customerId } = req.params;
    if(!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: "Invalid customer ID provided" })
    }
    const customerOrder = await ordersService.customerOrders(customerId);
    res.status(200).json({message: "Order", customerOrder})
  } 
  catch(err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createOrderLogic, fetchAllOrders, fetchSingleOrder, deleteOrder, customersOrder };
