const commentModel = require('../models/comment');
const postModel = require('../models/post');
const userModel = require('../models/user');

exports.createComment = async (req, res) => {
    try {
        // Extract the user's ID from the request user payload
        const { userId } = req.user;
        // Extract the Post ID from the params
        const { id: postId } = req.params;
        // Extract the comment from the request body
        const { comment } = req.body;
        // Check if the Post is still existing
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }
        // Find the User creating this comment and check if it's still existing
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        // Create a new intsance of the comment
        const newComment = new commentModel({
            comment,
            userId,
            username: user.fullName,
            postId
        });
        // Pushing the new comment to the CommentIds array in the post
        post.commentIds.push(newComment._id);
        // Save the changes to the database
        await newComment.save();
        await post.save();
        // Send a success response
        res.status(200).json({
            message: 'Comment submitted successfully',
            data: newComment
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

exports.getAll = async(req, res)=> {
    try {
        const allComments = await commentModel.find().populate('replies')
         // Send a success response
         res.status(200).json({
            message: 'All Comments retrieved',
            data: allComments
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error Fetching Comments"
        })
    }
}
