const Orders = require("../model/ordersModel");

class OrderService {
    // Create a new order
    async createOrder(data) {
        const order = new Orders(data); // Pass the data to the constructor
        await order.save();
        return order;
    }

    // Get a single order by ID
    async singleOrder(id) {
        const order = await Orders.findById(id);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }

    // Get all orders for a specific customer by customer ID
    async customerOrders(customerId) {
        const orders = await Orders.find({ customer: customerId });
        if (!orders.length) {
            throw new Error("No orders found for this customer");
        }
        return orders;
    }

    // Get all orders
    async allOrders() {
        const orders = await Orders.find();
        return orders;
    }

    // Update an order by ID
    async updateOrder(id, updateData) {
        const order = await Orders.findByIdAndUpdate(id, updateData, { new: true });
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }

    // Delete an order by ID
    async deleteOrder(id) {
        const order = await Orders.findByIdAndDelete(id);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }
}

module.exports = new OrderService();
