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

exports.login = async (req, res) => {
    // Extract the Email and Password from the request body
    const { email, password } = req.body;
    // First thing is to check if the user is registred in the database
    const user = await userModel.findOne({email: email.toLowerCase()});
    // Throw an Error is the User is not existing
    if(user === null){
        return res.status(404).json({
            message: `User with Email: ${email} does not exist.`
        })
    };
    // Conpare the password if it corresponds with the one saved in the database
    const passwordCorrect = await bcrypt.compare(password, user.password);
    // Throw an error if the password does not match
    if (passwordCorrect === false){
        return res.status(400).json({
            message: 'Incorrect password entered'
        })
    };
    const token = await jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    const {userPassword, ...userData} = user

    // Send a success response
    res.status(200).json({
        message: 'Login successful',
        data: {
            fullName: user.fullName,
            email: user.email,
            id: user._id,
            profilePic: user.profilePic,
        },
        token,
        userData
    })
}
