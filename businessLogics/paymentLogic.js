const PaymentService = require('../services/paymentService');
const paymentService = new PaymentService();

const initializePaymentLogic = async (req, res) => {
    try {
        const { amount, email, orderId } = req.body;
        const paymentData = await paymentService.initializePayment(amount, email, orderId);
        res.status(200).json(paymentData); // Respond with the data from Paystack API
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const verifyPaymentLogic = async (req, res) => {
    try {
        const { reference } = req.query;
        const paymentData = await paymentService.verifyPayment(reference);
        res.status(200).json({
            status: 'success',
            data: paymentData
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = { initializePaymentLogic, verifyPaymentLogic };
