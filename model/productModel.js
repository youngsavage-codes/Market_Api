const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        brand: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0;
                },
                message: "Price cannot be negative."
            }
        },
        stock: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return Number.isInteger(value) && value >= 0;
                },
                message: "Stock must be a non-negative integer."
            }
        },
        images: [
            {
                url: { type: String, required: true },
                altText: { type: String }
            }
        ],
        ratings: {
            averageRating: { type: Number, default: 0 },
            numReviews: { type: Number, default: 0 },
        },
        variants: [
            {
                color: { type: String },
                size: { type: String },
                additionalPrice: { type: Number, default: 0 }
            }
        ],
        tags: [
            {
                type: String,
                trim: true
            }
        ]
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
