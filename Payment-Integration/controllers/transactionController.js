const transactionModel = require('../models/transaction');
const axios = require('axios');
const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const formattedDate = new Date().toLocaleString()

exports.initialPayment = async (req, res) => {
    try {
        const { email, amount } = req.body;
        const paymentData = {
            email,
            amount: amount * 100
        }
        const response = await axios.post('https://api.paystack.co/transaction/initialize', paymentData, {
            headers: {
                Authorization: `Bearer ${SECRET_KEY}`
            }
        });
        const { data } = response;

        const payment = new transactionModel({
            email,
            amount,
            reference: data.data.reference,
            paymentDate: formattedDate
        });

        await payment.save();

        res.status(201).json({
            message: "Payment Initialized Successfully",
            data: {
                authorization_url: data?.data?.authorization_url,
                reference: data?.data?.reference
            },
            transactionData: payment
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Error Initializing Payment'
        })
    }
}

exports.verifyPayment = async (req, res) => {
    try {
        const { reference } = req.query;

        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${SECRET_KEY}`
            }
        });
        const { data } = response;

        if (data.data.status && data.data.status === 'success') {
            console.log('Payment successful')
            const payment = await transactionModel.findOneAndUpdate({ reference }, { status: 'Success' }, { new: true });
            res.status(200).json({
                message: 'Payment Verified successfully',
                data: payment
            })
        } else {
            console.log('Payment Failed')
            const payment = await transactionModel.findOneAndUpdate({ reference }, { status: 'Failed' }, { new: true });
            res.status(200).json({
                message: 'Payment Verification failed',
                data: payment
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Error Verifying Payment'
        })
    }
}
