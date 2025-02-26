const userModel = require('../models/user');
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const userExists = await userModel.findOne({ email: email.toLowerCase() });

        if (userExists) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                message: `User with Email: ${email} already exists`
            })
        };

        console.log('I Got Here');
        const result = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            fullName,
            email,
            password: hashedPassword,
            profilePic: {
                imageUrl: result.secure_url,
                publicId: result.public_id
            }
        });

        await user.save();

        res.status(200).json({
            message: 'User Registered successfully',
            data: user
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
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

// exports.login = async (req, res) => {
//     // Extract the Email and Password from the request body
//     const { email, password } = req.body;
//     // First thing is to check if the user is registred in the database
//     const user = await userModel.findOne({email: email.toLowerCase()});
//     // Throw an Error is the User is not existing
//     if(user === null){
//         return res.status(404).json({
//             message: `User with Email: ${email} does not exist.`
//         })
//     };
//     // Conpare the password if it corresponds with the one saved in the database
//     const passwordCorrect = await bcrypt.compare(password, user.password);
//     // Throw an error if the password does not match
//     if (passwordCorrect === false){
//         return res.status(400).json({
//             message: 'Incorrect password entered'
//         })
//     };
//     const token = await jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
//     // const {password, ...userData} = user

//     // Send a success response
//     res.status(200).json({
//         message: 'Login successful',
//         data: {
//             fullName: user.fullName,
//             email: user.email,
//             id: user._id,
//             profilePic: user.profilePic,
//         },
//         token
//     })
// }
