const CustomersService = require("../services/CustomersService");
const mongoose = require("mongoose")

const customersService = new CustomersService();

// CREATE CUSTOMER ACCOUNT
const createCustomerLogic = async (req, res) => {
    try {
        const { personalInfo, address, loginInfo, orders, wishlist, paymentMethods } = req.body;

        // Check for required fields
        if (!personalInfo || !address || !loginInfo) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Ensure that required fields inside `personalInfo`, `address`, and `loginInfo` are present
        if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phoneNumber) {
            return res.status(400).json({ error: "Missing required personal information fields" });
        }

        if (!address.city || !address.state || !address.postalCode || !address.country) {
            return res.status(400).json({ error: "Missing required address fields" });
        }

        if (!loginInfo.email || !loginInfo.password) {
            return res.status(400).json({ error: "Missing required login information fields" });
        }

        // Proceed to create a new customer
        const customerData = { personalInfo, address, loginInfo, orders, wishlist, paymentMethods };
        const newCustomer = await customersService.createCustomer(customerData);

        // Return success response with the created customer
        res.status(201).send({
            message: "Customer created successfully",
            customer: newCustomer
        });
    } catch (err) {
        // Return error response
        res.status(500).json({ error: err.message });
    }
};


// GET SINGLE CUSTOMER
const getSingleCustomerLogic = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid customer ID provided" });
        }

        const customer = await customersService.getSingleCustomer(id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL CUSTOMER
const getCustomersLogic = async (req, res) => {
    try {
        const customers = await customersService.getAllCustomers();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET CUSTOMER DATA
const updateCustomerLogic = async (req, res) => {
    try {
        const { personalInfo, address, loginInfo, orders, wishlist, cart, paymentMethods } = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid customer ID provided" });
        }

        const customerData = { personalInfo, address, loginInfo, orders, wishlist, cart, paymentMethods };
        const updatedCustomer = await customersService.updateCustomer(id, customerData);

        if (!updatedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.status(200).json({
            message: "Customer updated successfully",
            customer: updatedCustomer
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE CUSTOMER DATA
const deleteCustomerLogic = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid customer ID provided" });
        }

        const deletedCustomer = await customersService.deleteCustomer(id);
        if (!deletedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.status(200).json({
            message: "Customer deleted successfully",
            customer: deletedCustomer
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN CUSTOMER ACCOUNT
const loginLogic = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Perform the login using the CustomersService
        const { token, customer } = await customersService.login(email, password);

        // Return the token and customer data upon successful login
        return res.status(200).json({
            message: "Login successful",
            token,
            customer,
        });
    } catch (err) {
        // Handle errors and return appropriate response
        return res.status(401).json({ error: err.message });
    }
};

module.exports = {
    createCustomerLogic,
    getSingleCustomerLogic,
    getCustomersLogic,
    updateCustomerLogic,
    deleteCustomerLogic,
    loginLogic
};
