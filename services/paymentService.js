const axios = require('axios');
const Payment = require('../model/paymentModel');
require('dotenv').config();

// Paystack API endpoint for initializing a payment
const PAYSTACK_API_URL = 'https://api.paystack.co/transaction/initialize';

class PaymentService {
    // Initialize payment
    async initializePayment(amount, email, orderId) {
        try {
            const response = await axios.post(
                PAYSTACK_API_URL,
                {
                    amount: amount * 100, // Amount is in kobo
                    email,
                    callback_url: 'localhost:5000/api/v1/verify' // Your callback URL
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            const payment = new Payment({
                orderId,
                userId: email, // Assuming user ID is passed as email for simplicity
                amount,
                reference: response.data.data.reference,
                status: 'pending'
            });
    
            await payment.save();
    
            return {
                status: true,
                message: 'Authorization URL created',
                data: response.data.data
            };
        } catch (error) {
            console.error('Payment initialization error:', error.message);
            throw new Error('Payment initialization failed');
        }
    }
    
    // Verify payment
    async verifyPayment(reference) {
        try {
            const response = await axios.get(
                `https://api.paystack.co/transaction/verify/${reference}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                    }
                }
            );
    
            if (response.data.data.status === 'success') {
                // Update payment status in the database
                await Payment.findOneAndUpdate(
                    { reference },
                    { status: 'successful' },
                    { new: true }
                );
            } else {
                // Handle payment failure
                await Payment.findOneAndUpdate(
                    { reference },
                    { status: 'failed' },
                    { new: true }
                );
            }
    
            return response.data.data;
        } catch (error) {
            console.error('Payment verification error:', error.message);
            throw new Error('Payment verification failed');
        }
    }
}

module.exports = PaymentService;
