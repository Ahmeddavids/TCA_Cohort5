const commentModel = require('../models/comment');
const userModel = require('../models/user');
const postModel = require('../models/post');

exports.createComment = async (req, res) => {
    try {
        // Extract the userID and postID from the params
        const { postId, userId } = req.params;
        // Extract the comment from the request body
        const { comment } = req.body;
        // Find the user in the database
        const user = await userModel.findByPk(userId);
        // Find post in the database
        const post = await postModel.findByPk(postId);

        // Check if the user is found
        if (!user) {
            return res.status(404).json({
                messsage: 'User not found'
            })
        }

        // Check if the post is found
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }


        // Create new comment instance
        const newComment = await commentModel.create({
            comment,
            postId,
            user_name: user.fullName
        });

        // Send a success response
        res.status(201).json({
            messsage: 'Comment Added successfully',
            data: newComment
        })
    } catch (error) {
        res.status(500).json({
            messsage: 'Internal Server error' + error.messsage
        })
    }
};

exports.getComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await commentModel.findByPk(id);
        // Check if the Comment is found
        if (!comment) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        // Send a success response
        res.status(200).json({
            messsage: 'Comment found',
            data: comment
        })
    } catch (error) {
        res.status(500).json({
            messsage: 'Internal Server error' + error.messsage
        })
    }
}