const postModel = require('../models/post');
const userModel = require('../models/user');
const cloudinary = require('../config/cloudinary');
const fs = require('fs')

exports.createPost = async (req, res) => {
    try {
        // Extract the ID from the params and create a default variable called userID
        // console.log('Files: ',req.files)
        const { id: userId } = req.params;
        // Get the content from the request body
        const { content } = req.body;
        // Find the user by the ID
        const user = await userModel.findById(userId);
        // Check if the user is found and return an error if not found
        if (user === null) {
            return res.status(404).json({
                message: 'User not found'
            })
        };
        // Create a temporary Pictures Array
        const picturesURL = [];
        // Pass the files into a variable Files
        const files = req.files;
        // Use a For Of Loop to upload the Images one at a time to cloudinary
        for (const image of files) {
            const result = await cloudinary.uploader.upload(image.path);
            // Unlink the images from our local storage as it is uploading
            fs.unlinkSync(image.path);
            // Create an object for the images to hold the URL and the Public IDs
            const photo = {
                imageUrl: result.secure_url,
                imagePublicId: result.public_id
            }
            // Push the photo object into the temporal array created
            picturesURL.push(photo)
        }

        // Create an instance for the Post
        const post = new postModel({
            content,
            user: user.fullName,
            userId: user._id,
            images: picturesURL
        });
        // Push the post ID into the user's document
        user.postId.push(post._id);
        // Save the documents to the database
        await post.save();
        await user.save();

        // Send a success response
        res.status(201).json({
            message: 'Post created successfully',
            data: post
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { content } = req.body;
        const post = await postModel.findById(postId);
        console.log(post)
        // Check if the user is found and return an error if not found
        if (post === null) {
            return res.status(404).json({
                message: 'Post not found'
            })
        };
        const data = {
            content
        }

        if (req.files && req.files[0]) {
            for (const image of post.images) {
                await cloudinary.uploader.destroy(image.imagePublicId)
            }

            const picturesURL = []

            for (const image of req.files) {
                const result = await cloudinary.uploader.upload(image.path)
                fs.unlinkSync(image.path)
                const photo = {
                    imageUrl: result.secure_url,
                    imagePublicId: result.public_id
                }
                picturesURL.push(photo)
            }
            data.images = picturesURL;
        }

        const updatedPost = await postModel.findByIdAndUpdate(postId, data, { new: true });

        // Send success response 
        res.status(200).json({
            message: 'Post updated successfully',
            data: updatedPost
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
}


