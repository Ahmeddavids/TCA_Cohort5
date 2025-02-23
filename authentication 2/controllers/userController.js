const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUpTemplate } = require('../utils/mailTemplates');
const { sendEmail } = require('../middleware/nodemailer');

exports.register = async (req, res) => {
    try {
        const { fullName, gender, email, password } = req.body;
        // Check if the user is existing
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (user) {
            return res.status(400).json({
                message: `User with Email: ${email} already exists`
            })
        }
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // Create an Instance of the user document
        const newUser = new userModel({
            fullName,
            email,
            gender,
            password: hashedPassword
        });
        // Generate a tokem for the user
        const token = await jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '5mins' });
        // Generate the verifying link
        const link = `${req.protocol}://${req.get('host')}/api/v1/user-verify/${token}`;
        // Dynamically get the User's firstname from the Fullname
        const firstName = newUser.fullName.split(' ')[0]

        // Configure the email sending details
        const mailDetails = {
            email: newUser.email,
            subject: 'Welcome mail',
            html: signUpTemplate(link, firstName)
        }

        // Await nodemailer to send the user an email
        await sendEmail(mailDetails);
        // Save the user document to the database
        await newUser.save()

        res.status(201).json({
            message: 'User registered successfully',
            data: newUser
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

exports.verifyUser = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(400).json({
                message: 'Token not found'
            })
        };

        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if (err) {
                if (err instanceof jwt.JsonWebTokenError) {
                    const decodedToken = jwt.decode(token)
                    const user = await userModel.findById(decodedToken.userId);
                    if (user === null) {
                        return res.status(404).json({
                            message: 'User not found'
                        })
                    }

                    if (user.isVerified === true) {
                        return res.status(404).json({
                            message: 'User has already been verified'
                        })
                    }

                    const newToken = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5mins' });
                    const link = `${req.protocol}://${req.get('host')}/api/v1/user-verify/${newToken}`;
                    // Dynamically get the User's firstname from the Fullname
                    const firstName = user.fullName.split(' ')[0]

                    // Configure the email sending details
                    const mailDetails = {
                        email: user.email,
                        subject: 'Email Verification',
                        html: signUpTemplate(link, firstName)
                    }
                    // Await nodemailer to send the user an email
                    await sendEmail(mailDetails);

                    res.status(200).json({
                        message: 'Link expired, Check your email for the new verification link'
                    });
                }
            } else {
                console.log(payload)
                const user = await userModel.findById(payload.userId);
                if (user === null) {
                    return res.status(404).json({
                        message: 'User not found'
                    })
                }
                if (user.isVerified === true) {
                    return res.status(400).json({
                        message: 'User has already been verified'
                    })
                }

                user.isVerified = true;
                await user.save();


                res.status(200).json({
                    message: 'User verified successfully'
                })
            }
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (user === null) {
            return res.status(404).json({
                message: 'User not found'
            });
        };
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect === false) {
            return res.status(404).json({
                message: 'Incorrect password'
            });
        };
        if (user.isVerified === false){
            return res.status(400).json({
                message: 'Account not verified, Please check your email for verification link'
            });
        }
        const token = await jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1day'});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
