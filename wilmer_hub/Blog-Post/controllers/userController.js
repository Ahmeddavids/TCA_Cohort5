const userModel = require('../models/user');
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcrypt');
const fs = require('fs')

exports.register = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;
        const userExists = await userModel.findOne({email: email.toLowerCase()});

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
