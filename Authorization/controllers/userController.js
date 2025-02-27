const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUpTemplate, forgotTemplate } = require('../utils/mailTemplates');
const { sendEmail } = require('../middleware/nodemailer');
// Register user
exports.register = async (req, res) => {
    try {
        const { fullName, gender, email, password, username } = req.body;
        // Check if the user is existing
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (user) {
            return res.status(400).json({
                message: `User with Email: ${email} already exists`
            })
        }
        // Check if the username is existing
        const usernameExists = await userModel.findOne({ username: username.toLowerCase() });
        if (usernameExists) {
            return res.status(400).json({
                message: `Username has already been taken`
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
            username,
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
// Verify User
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

// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        // Get the email from the request body
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: 'Please input your email'
            })
        }
        //  Check for the user
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        // Generate a token for the user
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10mins' });
        // Create the reset link
        const link = `${req.protocol}://${req.get('host')}/api/v1/initiate/recover/${token}`;
        const firstName = user.fullName.split(' ')[0];
        // configure the email details
        const mailDetails = {
            subject: 'Password Reset',
            email: user.email,
            html: forgotTemplate(link, firstName)
        }
        // Await nodemailer to send the user an email
        await sendEmail(mailDetails);

        // Send a success response
        res.status(200).json({
            message: 'Password reset initiated, Please check your email for the reset link'
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
};

exports.resetPassword = async (req, res) => {
    try {
        // Extract the token from the params
        const { token } = req.params;
        // Extract the passwod and confirm password from the request body
        const { password, confirmPassword } = req.body;
        // Verify if the token is still valid
        const { userId } = await jwt.verify(token, process.env.JWT_SECRET);
        // Check if the user is still existsing
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        // Confirm that the password matches
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Password does not match'
            })
        }
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Update the user's password to the new password
        user.password = hashedPassword;

        // Save the changes to the database
        await user.save();

        // Send a success response
        res.status(200).json({
            message: 'Password reset successful'
        })

    } catch (error) {
        console.log(error.message)
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(400).json({
                message: 'Link expired, Please initiate a link'
            })
        }
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email && !username) {
            return res.status(404).json({
                message: 'Please enter either email or username'
            });
        }
        if (!password) {
            return res.status(404).json({
                message: 'Please enter your password'
            });
        }
        const user = await userModel.findOne({ $or: [{ email }, { username: username.toLowerCase() }] });
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
        if (user.isVerified === false) {
            return res.status(400).json({
                message: 'Account not verified, Please check your email for verification link'
            });
        }
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15min' });
        // Send a response
        res.status(200).json({
            message: 'Login successful',
            data: user,
            token
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

