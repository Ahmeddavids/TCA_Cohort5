// Import Transaction Model
const transactionModel = require('../models/transaction');
const axios = require('axios');
const otpGenerator = require('otp-generator');
const otp = otpGenerator.generate(12, { specialChars: false });
const ref = `TCA-AF-${otp}`;
const SECRET_KEY = process.env.KORAPAY_SECRET_KEY;
const formatedDate = new Date().toLocaleString();

exports.initializePayment = async (req, res) => {
    try {
        const { amount, email, name } = req.body;
        if (!email || !amount || !name) {
            return res.status(400).json({
                message: 'Please input all field'
            })
        };
        // Payment data to send to Korapay
        const paymentData = {
            amount,
            customer: {
                name,
                email
            },
            currency: 'NGN',
            reference: ref
        }
        // Send the required data and the headers as a POST method to KORAPAY using axios
        const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/initialize', paymentData, {
            headers: {
                Authorization: `Bearer ${SECRET_KEY}`
            }
        });

        // Extract the Kora's data 
        const { data } = response?.data;
        // Create an Instaance of the Payment in the database
        const payment = new transactionModel({
            name,
            email,
            amount,
            reference: paymentData.reference,
            paymentDate: formatedDate
        })
        // Save the instance to the database
        await payment.save();
        // Send a success response
        res.status(200).json({
            message: 'Payment Initialized Successfully',
            data: {
                reference: data?.reference,
                checkout_url: data?.checkout_url
            }
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        // Extract the Reference from the query params
        const { reference } = req.query;
        // Get the payment data from  Kora by sending a GET method to their API
        const response = await axios.get(`https://api.korapay.com/merchant/api/v1/charges/${reference}`, {
            headers: { Authorization: `Bearer ${SECRET_KEY}` }
        });
        // Extract the data from the response
        const { data } = response?.data;
        // Update your database according to the status of the response from KORAPAY API
        if (data?.status && data?.status === 'success') {
            // UPdate to Success if yes
            const payment = await transactionModel.findOneAndUpdate({ reference }, { status: 'Success' }, { new: true });
            res.status(200).json({ message: 'Payment Verified Successfully', data: payment })
        } else {
            // Update to Failed  
            const payment = await transactionModel.findOneAndUpdate({ reference }, { status: 'Failed' }, { new: true });
            res.status(200).json({ message: 'Payment Verification Failed', data: payment })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
