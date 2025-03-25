const commentModel = require('../models/comment');
const postModel = require('../models/post');
const replyModel = require('../models/reply');
const userModel = require('../models/user');


exports.replyComment = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id: commentId } = req.params;
        const { reply } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const comment = await commentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                message: 'Comment no longer available'
            })
        }
        const post = await postModel.findById(comment.postId);
        if (!post) {
            return res.status(404).json({
                message: 'Post no longer available'
            })
        }

        const newReply = new replyModel({
            reply,
            userId,
            username: user.fullName,
            commentId,
            postId: comment.postId
        });

        comment.replies.push(newReply._id);
        await newReply.save();
        await comment.save();

        res.status(201).json({
            message: 'Reply successful',
            data: newReply
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error replying to a comment' })
    }
}

exports.replyToAReply = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id: replyId } = req.params;
        const { reply } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const existReply = await replyModel.findById(replyId);
        if (!existReply) {
            return res.status(404).json({
                message: 'Reply no longer available'
            })
        }
        const comment = await commentModel.findById(existReply.commentId);
        if (!comment) {
            return res.status(404).json({
                message: 'Comment no longer available'
            })
        }
        const post = await postModel.findById(comment.postId);
        if (!post) {
            return res.status(404).json({
                message: 'Post no longer available'
            })
        }

        const newReply = new replyModel({
            reply,
            userId,
            username: user.fullName,
            commentId: existReply.commentId,
            postId: comment.postId
        });

        existReply.replies.push(newReply._id);
        await newReply.save();
        await existReply.save();

        res.status(201).json({
            message: 'Reply successful',
            data: newReply
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error replying to a reply' })
    }
}

exports.getAll = async(req, res)=> {
    try {
        const allReplies = await replyModel.find().populate('replies')
         // Send a success response
         res.status(200).json({
            message: 'All Replies retrieved',
            data: allReplies
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error Fetching Replies"
        })
    }
}
