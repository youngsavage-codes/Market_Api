const {
    createCustomerLogic, 
    getSingleCustomerLogic, 
    getCustomersLogic, 
    updateCustomerLogic, 
    deleteCustomerLogic, 
    loginLogic} = require("../businessLogics/customersLogic");
const asyncHandler = require("express-async-handler");

class CustomerController {
    createCustomer = asyncHandler(async (req, res) => {
        await createCustomerLogic(req, res);
    });
    getSingleCustomer = asyncHandler(async (req, res) => {
        await getSingleCustomerLogic(req, res);
    });
    getCustomers = asyncHandler(async (req, res) => {
        await getCustomersLogic(req, res)
    })
    updateCustomer = asyncHandler(async (req, res) => {
        await updateCustomerLogic(req, res)
    })
    deleteCustomer = asyncHandler(async (req, res) => {
        await deleteCustomerLogic(req, res)
    })
    loginCustomer = asyncHandler(async (req, res) => {
        await loginLogic(req, res);
    });
}

module.exports = CustomerController;