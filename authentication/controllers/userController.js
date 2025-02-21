const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const sendEmail = require('../middleware/nodemailer');
const jwt = require('jsonwebtoken');
const { signUpTemplate } = require('../utils/mailTemplates');


exports.register = async (req, res) => {
    try {
        // Extract the required fields from  the request body
        const { fullName, email, gender, password } = req.body;
        const userExists = await userModel.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({
                message: `User with Email: ${email} already exists`
            })
        };
        // Encrypt the User's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create an Instance of the document
        const user = new userModel({
            fullName,
            email,
            password: hashedPassword,
            gender
        });

        // Generate a token for the User
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Configure the link to verify the user
        const link = `${req.protocol}://${req.get('host')}/api/v1/user-verify/${token}`
        const firstName = user.fullName.split(' ')[1]
        const html = signUpTemplate(link, firstName)

        // Send the user an email
        const mailOptions = {
            subject: 'Welcome Email',
            email: user.email,
            html
        };

        // Await the nodemailer to send the email to the user
        await sendEmail(mailOptions);
        // Save the User document to the database
        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            data: user,
            token
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Error registring User'
        })
    }
}

exports.login = async (req, res) => {
    try {
        // Extract the Email and Password from the request body
        const { email, password } = req.body;
        const userExists = await userModel.findOne({ email: email.toLowerCase() });
        // Check if the user is existsing
        if (userExists === null) {
            return res.status(404).json({
                message: `User with email: ${email} does not exist`
            })
        };

        // Confirm the  user's password
        const isCorrectPassword = await bcrypt.compare(password, userExists.password);
        if (isCorrectPassword === false) {
            return res.status(400).json({
                message: "Incorrect Password"
            })
        };
        // Check if the user is verified
        if (userExists.isVerified === false) {
            return res.status(400).json({
                message: "User not verified, Please check your email to verify"
            })
        }
        // Generate a token for the user
        const token = await jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, { expiresIn: '1day' });

        // Send a success response 
        res.status(200).json({
            message: 'Login successful',
            data: userExists,
            token
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Error Logging in User'
        })
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        // Extract token from params;
        const { token } = req.params;
        // Check if token is not available
        if (!token) {
            return res.status(400).json({
                message: 'Token  not found'
            })
        };
        // Verify the token
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by the decoded token ID
        const user = await userModel.findById(decodedToken.userId);
        // Throw an Error if user is not found
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        };
        // Update the IsVerified field to True
        user.isVerified = true;
        // Save the changes to the database
        await user.save()
        // Send a success response
        res.status(200).json({
            message: 'User verified successfully'
        })
    } catch (error) {
        console.log(error.message)
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Verification link expired'
            })
        }
        res.status(500).json({
            message: 'Error verifying User: ' + error.message
        })
    }
}

exports.resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if token is not available
        if (!email) {
            return res.status(400).json({
                message: 'Please enter email address'
            })
        };
        const user = await userModel.findOne({ email: email.toLowerCase() });
        // Throw an Error if user is not found
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        };
        // Generate a token for the user
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Configure the link to verify the user
        const link = `${req.protocol}://${req.get('host')}/api/v1/user-verify/${token}`
        const firstName = user.fullName.split(' ')[1]
        const html = signUpTemplate(link, firstName)

        // Send the user an email
        const mailOptions = {
            subject: 'Email Verification',
            email: user.email,
            html
        };

        // Await the nodemailer to send the email to the user
        await sendEmail(mailOptions);
        // Send a success response
        res.status(200).json({
            message: 'Verification email sent, Please check your mail box'
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Error resending verification email: ' + error.message
        })
    }
}
