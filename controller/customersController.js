const {
    createCustomerLogic, 
    getSingleCustomerLogic, 
    getCustomersLogic, 
    updateCustomerLogic, 
    deleteCustomerLogic, 
    loginLogic,
    addWishlistLogic,
    removeWishlistLogic} = require("../businessLogics/customersLogic");
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
    addWishlist = asyncHandler(async (req, res) => {
        await addWishlistLogic(req, res);
    })
    removeWishlist = asyncHandler(async (req, res) => {
        await removeWishlistLogic(req, res);
    })
    loginCustomer = asyncHandler(async (req, res) => {
        await loginLogic(req, res);
    });
}

module.exports = CustomerController;