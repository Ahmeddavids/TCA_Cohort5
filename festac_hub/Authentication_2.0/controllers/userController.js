// Import user model
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUpTemplate } = require('../utils/mailTemplates');
const sendEmail = require('../utils/nodemailer');


exports.register = async (req, res) => {
    try {
        // Extract required fields from the request body
        const { fullName, email, password } = req.body;
        // Check if a user with the email already exists
        const userExists = await userModel.findOne({ email: email.toLowerCase() });
        // Throw an error if it does
        if (userExists){
            return res.status(400).json({
                message: `Email: ${email} already in use`
            })
        };
        // Salt and Hash the User's password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create an Instance of the User document
        const user = new userModel({
            fullName,
            email,
            password: hashedPassword
        });
        // Generate a token
        const token = await jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '10mins'});
        // Create the verify link with the token generated
        const link = `${req.protocol}://${req.get('host')}/api/v1/verify-user/${token}`
        const firstName = user.fullName.split(' ')[0];
        // Create the email details
        const mailDetails = {
            email: user.email,
            subject: 'Welcome to AI podcast',
            html: signUpTemplate(link, firstName)
        };

        
        // Save the user document to database
        await user.save();
        // Await nodemailer to send the email
        await sendEmail(mailDetails);
        // Send a success response
        res.status(200).json({
            message: 'User registered successfully',
            data: user
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}