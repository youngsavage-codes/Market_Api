const Customers = require("../model/customersModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

class CustomersService {
    // Create a new customer
    async createCustomer(data) {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(data.loginInfo.password, 10);
        data.loginInfo.password = hashedPassword;
        
        const customer = new Customers(data); 
        await customer.save();
        return customer;
    }

    async verifyEmail() {

    }

    async sendOtp() {

    }

    async forgotPassword(email) {

    }

    // Get a single customer by ID
    async getSingleCustomer(id) {
        const customer = await Customers.findById(id);
        if (!customer) {
            throw new Error("Customer not found");
        }
        return customer;
    }

    // Get all customers
    async getAllCustomers() {
        const customers = await Customers.find();
        return customers;
    }

    // Update a customer by ID
    async updateCustomer(id, updateData) {
        if (updateData.loginInfo && updateData.loginInfo.password) {
            // Hash the new password if it's being updated
            updateData.loginInfo.password = await bcrypt.hash(updateData.loginInfo.password, 10);
        }

        const customer = await Customers.findByIdAndUpdate(id, updateData, { new: true });
        if (!customer) {
            throw new Error("Customer not found");
        }
        return customer;
    }

    // Delete a customer by ID
    async deleteCustomer(id) {
        const customer = await Customers.findByIdAndDelete(id);
        if (!customer) {
            throw new Error("Customer not found");
        }
        return customer;
    }

    // Add a product to the customer's wishlist
    async addWishList(customerId, productId) {
        const customer = await Customers.findById(customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }
    
        // Add the product to the wishlist if it's not already in the wishlist
        if (!customer.wishlist.includes(productId)) {
            customer.wishlist.push(productId);
            await customer.save();
        }
    
        return customer;
    }
    
    // Remove a product from the customer's wishlist
    async removeWishList(customerId, productId) {
        const customer = await Customers.findById(customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }
    
        // Remove the product from the wishlist
        customer.wishlist = customer.wishlist.filter(item => item.toString() !== productId.toString());
        await customer.save();
    
        return customer;
    }

    // Login a customer
    async login(email, password) {
        // Find the customer by email
        const customer = await Customers.findOne({ "loginInfo.email": email });
        if (!customer) {
            throw new Error("Invalid email or password");
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, customer.loginInfo.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        // Generate a JWT token
        const token = jwt.sign(
            { customerId: customer._id, email: customer.loginInfo.email },
            process.env.JWT_SECRET, // Make sure you have this in your .env file
            { expiresIn: "1h" }
        );

        return { token, customer };
    }
}

module.exports = CustomersService;
