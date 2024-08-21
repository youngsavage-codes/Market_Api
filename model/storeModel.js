const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a separate schema for contact details
const contactDetailsSchema = new Schema({
    address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    contactNumber: {
        type: String,
        trim: true,
        maxlength: 15,
        validate: {
            validator: function(v) {
                return /\d{10,15}/.test(v); // Basic regex for validating phone numbers
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v); // Basic email validation regex
            },
            message: props => `${props.value} is not a valid email!`
        }
    }
});

// Define the main store schema
const storeSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ""
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    contactDetails: [contactDetailsSchema], // Use the contact details schema
    isActive: {
        type: Boolean,
        default: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Mongoose will handle createdAt and updatedAt fields
});

// Create and export the Store model
const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
