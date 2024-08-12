const {initializePaymentLogic, verifyPaymentLogic} = require("../businessLogics/paymentLogic");
const asyncHandler = require("express-async-handler");

class PaymentController {
    initializePayment = asyncHandler(async (req, res) => {
        await initializePaymentLogic(req, res)
    })
    verifyPaymentLogic = asyncHandler(async (req, res) => {
        await verifyPaymentLogic(req, res)
    })
}

module.exports = PaymentController