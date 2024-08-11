const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        personalInfo: {
            image: {type: String},
            firstName: {type: String, required: true},
            lastName: {type: String, required: true},
            email: {type: String, required: true, unique: true},
            phoneNumber: {type: String, required: true},
        },
        address: {
            addressLine1: {type: String, required: true},
            addressLine2: {type: String},
            city: {type: String, required: true},
            state: {type: String, required: true},
            postalCode: {type: String, required: true},
            country: {type: String, required: true},
            isDefault: {type: Boolean},
        },
        loginInfo: {
            email: {type: String, required: true, unique: true},
            password: {type: String, required: true},
        },
        orders: [{
            orderId: {type: Schema.Types.ObjectId, ref: "orders"},
            orderDate: {type: Date},
            orderStatus: {type: String},
        }],
        wishlist: [{type: Schema.Types.ObjectId, ref: "products"}],
        cart: [
            {
                productId: {type: Schema.Types.ObjectId, ref: "products"},
                quantity: {type: Number},
            }
        ],
        paymentMethods: [{
            cardType: {type: String},
            cardNumber: {type: String},
            expiryDate: {type: String},
            cardholderName: {type: String},
            isDefault: {type: Boolean, default: false},
        }],
    }, 
    {
        timestamps: true,
    }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
