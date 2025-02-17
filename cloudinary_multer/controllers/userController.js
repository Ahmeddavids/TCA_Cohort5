const userModel = require('../models/user');
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcrypt');
const fs = require('fs')


exports.register = async (req, res) => {
    try {
        const { fullName, email, password, } = req.body;
     
        const result = await cloudinary.uploader.upload(req.file.path);

        fs.unlinkSync(req.file.path);

        const emailExists = await userModel.findOne({ email: email.toLowerCase() });

        if (emailExists) {
            await cloudinary.uploader.destroy(result.public_id)
            return res.status(400).json({
                message: `User with email: ${email} already exists`
            })
        };


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

        res.status(201).json({
            message: 'User registered successfully',
            data: user
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
}

