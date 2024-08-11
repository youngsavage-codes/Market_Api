const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        customer: { 
            type: Schema.Types.ObjectId, 
            ref: "Customer", 
            required: true 
        },
        orderItems: [
            {
                product: { 
                    type: Schema.Types.ObjectId, 
                    ref: "Product", 
                    required: true 
                },
                quantity: { 
                    type: Number, 
                    required: true 
                },
                price: { 
                    type: Number, 
                    required: true 
                },
            }
        ],
        shippingAddress: {
            addressLine1: {type: String, required: true},
            addressLine2: {type: String},
            city: {type: String, required: true},
            state: {type: String, required: true},
            postalCode: {type: String, required: true},
            country: {type: String, required: true},
        },
        paymentInfo: {
            paymentMethod: {type: String, required: true}, // e.g., 'Credit Card', 'PayPal'
            paymentStatus: {type: String, required: true}, // e.g., 'Pending', 'Completed'
            paymentDate: {type: Date},
            transactionId: {type: String}, // from payment gateway
        },
        orderStatus: { 
            type: String, 
            required: true, 
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], 
            default: "Pending" 
        },
        totalPrice: { 
            type: Number, 
            required: true 
        },
        shippingPrice: { 
            type: Number, 
            required: true 
        },
        taxPrice: { 
            type: Number 
        },
        deliveredAt: { 
            type: Date 
        },
        canceledAt: { 
            type: Date 
        },
    }, 
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
