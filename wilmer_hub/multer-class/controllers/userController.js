const userModel = require('../models/user');
const fs = require('fs');

exports.createUser = async (req, res) => {
    try {
        // Extract the data from the request body
        const { fullName, email } = req.body;
        // Get the uploaded file from the request file
        const file = req.file;
        // Create an instance of the document and save to the database
        const user = await userModel.create({
            fullName,
            email,
            image: file.originalname
        });

        // Send a success response
        res.status(201).json({
            message: 'User create successfully',
            data: user
        })
    }
    catch (e) {
        res.status(500).json({
            message: 'Error creating user: ' + e.message
        })
    }
};

exports.getOneUser = async (req, res) => {
    try {
        // Extract the ID from the params
        const { id } = req.params
        // Find the user by their ID
        const user = await userModel.findById(id);
        // Check if the user Exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            })
        }

        // Send a success response
        res.status(200).json({
            message: 'User found',
            data: user
        })

    } catch (e) {
        res.status(500).json({
            message: 'Error creating user: ' + e.message
        })
    }
}

exports.update = async (req, res) => {
    try {
        // Extract the ID from the params
        const { id } = req.params
        //  Get required fields from the request body
        const { fullName, email } = req.body;
        // console.log(fullName);
        
        // Find the user by their ID
        const user = await userModel.findById(id);
        // Check if the user Exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            })
        }
        const data = {
            fullName,
            email,
            image: user.image
        }

        const oldFilePath = `./uploads/${user.image}`
        console.log(oldFilePath);
        
        // Check if the user is uploading an Image
        if (req.file && req.file.filename){
            console.log('If file exists',fs.existsSync(oldFilePath))
            // If the file Exists
            if (fs.existsSync(oldFilePath)){
                // Delete the old file
                fs.unlinkSync(oldFilePath)
                // Update the data object with the new file name
                data.image = req.file.originalname
            }
        }

        // Update the changed to the database
        const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true });

        // Send a success response
        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser        })


    } catch (error) {
        res.status(500).json({
            message: 'Error creating user: ' + error.message
        })
    }
}