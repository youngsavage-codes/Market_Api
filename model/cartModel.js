const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return Number.isInteger(value) && value > 0;
                },
                message: "Quantity must be a positive integer."
            }
        },
    },
    {
        _id: false
    }
);

const cartSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
            unique: true
        },
        items: [cartItemSchema],
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
