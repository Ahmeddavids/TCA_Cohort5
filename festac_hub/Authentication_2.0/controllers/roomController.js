// Import the room model
const roomModel = require('../models/room');
// Import Category Model
const categoryModel = require('../models/category');
// Import cloudinary
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.createRoom = async (req, res) => {
    try {
        // Get the category ID from the params
        const { id: categoryId } = req.params;
        // Extract the required fields from the request body
        const { roomName, price, roomNumber, description } = req.body;
        // check if the category exists and throw an error if it doesn't
        const categoryExists = await categoryModel.findById(categoryId);
        if (categoryExists == null) {
            return res.status(404).json({
                message: 'Category not found'
            })
        }
        // Get the files into a variable
        const file = req.files;
        // Declare an empty array to help hold the results from cloudinary
        const imageArray = [];

        // Handle the image uploading to cloudinary one after the other
        for (const image of file) {
            const result = await cloudinary.uploader.upload(image.path);
            // Delete the image from the local storage
            fs.unlinkSync(image.path);
            // Create the image properties using the result from the cloudinary
            const imageProperties = {
                imageUrl: result.secure_url,
                imageId: result.public_id
            }
            // Push the result object into the initial empty array
            imageArray.push(imageProperties)
        }
        
        // Create an instance of the document
        const room = new roomModel({
            category: categoryId,
            roomName,
            roomNumber,
            price,
            description,
            images: imageArray
        });

        // Add the new room to the category
        categoryExists.rooms.push(room._id);

        // Save the changes to the documents to the database
        await room.save();
        await categoryExists.save(); 

        // Send a success response
        res.status(200).json({
            message: 'Room added successfully',
            data: room
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
