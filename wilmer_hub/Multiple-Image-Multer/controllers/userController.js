const path = require('path');
const userModel = require('../models/user');
const fs = require('fs');
const { isUint8ClampedArray } = require('util/types');

exports.createUser = async (req, res) => {
    try {
        // Extract the required fields from the request body
        const { fullName, email } = req.body;
        // Get the incoming files and pass them into a variable
        const files = req.files.map((element) => element.filename);
        // Create an Instance of the document
        const user = new userModel({
            fullName,
            email,
            familyPictures: files
        });

        // Save the document to the database
        await user.save();

        // Send a success response
        res.status(201).json({
            message: 'User created successfully',
            data: user
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        // Get the ID from the params
        const { id } = req.params;
        // Extract the fields to be updated from the request body
        const { fullName, email } = req.body;

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        // Create a data object
        const data = {
            fullName,
            email,
            familyPictures: user.familyPictures
        };

        //   Dynamically declare each file path
        const oldFilePaths = user.familyPictures.map((e) => { return `./uploads/${e}` })
        // Check if the user is uploading an image
        if (req.files && req.files[0]) {
            // Run a check for each of the file paths
            oldFilePaths.forEach((path) => {
                // Check if the paths are existing
                if (fs.existsSync(path)) {
                    // Delete the existing images
                    fs.unlinkSync(path)
                    //   Upload the new image and update the data object
                    const files = req.files.map((element) => element.filename);
                    data.familyPictures = files

                }
            })

        }
        // Pass the updated data object to the database
        const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true })
        // Send a success response
        res.status(201).json({
            message: 'User created successfully',
            data: updatedUser
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
}

exports.deleteuser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const oldFilePaths = user.familyPictures.map((e) => { return `./uploads/${e}` })
        const deleteuser =await userModel.findByIdAndDelete(id)
        
        if (deleteuser) {
            oldFilePaths.forEach((path) => {
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path)  
            }
            })
        }
        res.status(201).json({
            message: 'user deleted successfully'
            
        })
    } catch (error) {
       res.status(500).json({
        message: 'Internal Server Error ' + error.message 
       }) 
    }
}