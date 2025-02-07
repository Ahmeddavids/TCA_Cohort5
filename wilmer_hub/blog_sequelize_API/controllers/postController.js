const Comment = require('../models/comment');
const postModel = require('../models/post');
const userModel = require('../models/user');

exports.createPost = async (req, res) => {
    try {
        const userId = req.params.id;
        const { content } = req.body;
        // Find the user
        const user = await userModel.findByPk(userId);
        // Check if the user is found
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        // Create the post
        const post = await postModel.create({
            content,
            userId
        });
        // Send success response
        res.status(201).json({
            message: 'Post created successfully',
            data: post
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
};

exports.getPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postModel.findOne({ where: { id: id }, include: [{ model: Comment, attributes: ['user_name', 'comment'], as: "Comments" }] });

        // Check if the post is found
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        // Send a success response
        res.status(200).json({
            message: "Post found",
            data: post
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

