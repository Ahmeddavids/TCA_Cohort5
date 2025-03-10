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
        if (userExists) {
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
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: 30 });
        // Create the verify link with the token generated
        const link = `${req.protocol}://${req.get('host')}/api/v1/verify-user/${token}`
        const firstName = user.fullName.split(' ')[0];
        // Create the email details
        const mailDetails = {
            email: user.email,
            subject: 'Welcome to AI podcast',
            html: signUpTemplate(link, firstName)
        };
        console.log(token);


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

exports.verifyUser = async (req, res) => {
    try {
        // Get the token from the params
        const { token } = req.params;
        // Verify the Token
        await jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
            if (error) {
                // Check if error is JWT expires error
                if (error instanceof jwt.TokenExpiredError) {
                    const decodedToken = await jwt.decode(token);
                    //    Check for the user
                    const user = await userModel.findById(decodedToken.userId);
                    if (user == null) {
                        return res.status(404).json({
                            message: 'User not found'
                        })
                    }
                    // Check if the user has already been verified
                    if (user.isVerified === true) {
                        return res.status(400).json({
                            message: 'User has already been verified, Please proceed to login'
                        })
                    }
                    // Generate a new token
                    const newToken = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3mins' });
                    // Dynamically create the link
                    const link = `${req.protocol}://${req.get('host')}/api/v1/verify-user/${newToken}`;
                    // Get the user's first name
                    const firstName = user.fullName.split(' ')[0];
                    // Create the email details
                    const mailDetails = {
                        email: user.email,
                        subject: 'Email verification',
                        html: signUpTemplate(link, firstName)
                    }
                    // Await nodemailer to send the email
                    await sendEmail(mailDetails);
                    // Send a success response
                    res.status(200).json({
                        message: "Link expired: A new verification link was sent, Please check your email"
                    })

                }
            } else {
                // Find the user in the database
                const user = await userModel.findById(payload.userId);
                // Check if user still exists
                if (user === null) {
                    return res.status(404).json({
                        message: 'User not found'
                    })
                };
                // Check if the user has already been verified
                if (user.isVerified === true) {
                    return res.status(400).json({
                        message: 'User has already been verified, Please proceed to login'
                    })
                }
                // Verify the user account
                user.isVerified = true;
                // Save the changes to the database
                await user.save();
                // Send a success response
                res.status(200).json({
                    message: "Account verified successfully"
                });
            }
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
};

exports.login = async (req, res) => {
    try {
        // Extract the user's email and password from the request body
        const { email, password } = req.body;

        if (email == undefined || password == undefined) {
            return res.status(400).json({
                message: 'Please enter email and password'
            });
        };
        // Check for the user and throw error if not found
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (user == null) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // Check the password if it is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect === false) {
            return res.status(400).json({
                message: 'Invalid Password'
            });
        }
        // Generate a token for the user
        const token = await jwt.sign({ userId: user._id, isAdmin: user.isAdmin, isSuperAdmin: user.isSuperAdmin }, process.env.JWT_SECRET, { expiresIn: '15mins' });
        const { password: hashedPassword, ...data } = user._doc
        // Send a success response
        res.status(200).json({
            message: 'Login successful',
            data,
            token
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({
            message: "All user's in the database",
            data: users
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

// exports.verifyUser = async (req, res) => {
//     try {
//         // Get the token from the params
//         const { token } = req.params;
//         // Verify the Token
//         const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
//         // Find the user in the database
//         const user = await userModel.findById(decodedToken.userId);
//         // Check if user still exists
//         if (user === null) {
//             return res.status(404).json({
//                 message: 'User not found'
//             })
//         };
//         // Check if the user has already been verified
//         if (user.isVerified === true) {
//             return res.status(400).json({
//                 message: 'User has already been verified, Please proceed to login'
//             }) 
//         }
//         // Verify the user account
//         user.isVerified = true;
//         // Save the changes to the database
//         await user.save();
//         // Send a success response
//         res.status(200).json({
//             message: "Account verified successfully"
//         });
//     } catch (error) {
//         console.log(error.message)
//         if (error instanceof jwt.TokenExpiredError) {
//             return res.status(400).json({
//                 message: 'Verification Link expired: Please resend a new verification link'
//             })
//         }
//         res.status(500).json({
//             message: 'Internal Server Error'
//         })
//     }
// };

exports.resendVerificationEmail = async (req, res) => {
    try {
        // Extract the user's email from the request body
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: 'Please enter Email Address'
            })
        };
        // Find the user and confirm if the user exists
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (user == null) {
            return res.status(404).json({
                message: 'User not found'
            })
        };
        // Check if the user has already been verified
        if (user.isVerified === true) {
            return res.status(400).json({
                message: 'User has already been verified, Please proceed to login'
            })
        }
        // Generate a token for the user
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: 30 });
        // Create the verify link with the token generated
        const link = `${req.protocol}://${req.get('host')}/api/v1/verify-user/${token}`
        const firstName = user.fullName.split(' ')[0];
        // Create the email details
        const mailDetails = {
            email: user.email,
            subject: 'Verification Link',
            html: signUpTemplate(link, firstName)
        };

        //  Await nodemailer to send the email
        await sendEmail(mailDetails);

        // Send a success response
        res.status(200).json({
            message: 'New verification link sent, Please check your email'
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

exports.makeAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the user and confirm if the user exists
        const user = await userModel.findById(id);
        if (user == null) {
            return res.status(404).json({
                message: 'User not found'
            })
        };
        if (user.isAdmin == true) {
            return res.status(400).json({
                message: 'User is already an Admin'
            })
        };

        user.isAdmin = true;

        await user.save();
        // Send a success response
        res.status(200).json({
            message: `User: ${user.fullName} is now an Admin`
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
