const Order = require('../model/ordersModel'); // Adjust the path as needed

class OrderService {
  // Create a new order
  async createOrder(data) {
    try {
      const order = new Order(data);
      const savedOrder = await order.save();
      return savedOrder;
    } catch (error) {
      throw new Error('Error creating order: ' + error.message);
    }
  }

  // Fetch all orders
  async allOrders() {
    try {
      const orders = await Order.find().populate('customer').populate('orderItems.product');
      if (orders.length === 0) {
        throw new Error("No orders found");
      }
      return orders;
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
    }
  }

  // Fetch a single order by its ID
  async singleOrder(id) {
    try {
      const order = await Order.findById(id).populate('customer').populate('orderItems.product');
      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    } catch (error) {
      throw new Error('Error fetching order: ' + error.message);
    }
  }

  // Delete an order by its ID
  async deleteOrder(id) {
    try {
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    } catch (error) {
      throw new Error('Error deleting order: ' + error.message);
    }
  }

  // Fetch all orders for a specific customer by their ID
  async customerOrders(customerId) {
    try {
      const orders = await Order.find({ customer: customerId })
        .populate('customer')
        .populate('orderItems.product');
      if (orders.length === 0) {
        throw new Error("No orders found for this customer");
      }
      return orders;
    } catch (error) {
      throw new Error('Error fetching customer orders: ' + error.message);
    }
  }
}

module.exports = OrderService;
