const express = require("express")
const route =  express.Router();
const CustomerController = require("../controller/customersController")

const customerController = new CustomerController()

route.post("/customer/create",  customerController.createCustomer);
route.get("/customer/",  customerController.getCustomers);
route.get("/customer/:id",  customerController.getSingleCustomer);
route.put("/customer/:id",  customerController.updateCustomer);
route.delete("/customer/:id",  customerController.deleteCustomer);
route.post("/login", customerController.loginCustomer);

module.exports = route;