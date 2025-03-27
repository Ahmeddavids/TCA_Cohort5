const commentModel = require("../models/comment");
const postModel = require("../models/post");
const replyModel = require("../models/reply");
const userModel = require("../models/user");

exports.reactToPost = async (req, res) => {
    try {
        // Get the User ID from the Request User
        const { userId } = req.user;
        const { id: postId } = req.params;
        const { reaction } = req.body;
        // Find the User and check if it exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User does not exists' })
        }
        // Find the Post and check if it exists
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post no longer available' })
        }
        // Check if the User has an existing reaction and return the index of the existsing reaction
        const indexOfReaction = post.reactions.findIndex((element) => element.userId == userId);
        // Create a new instance of the reaction
        const newReaction = {
            username: user.fullName,
            reaction,
            userId
        }
        // Push the new reaction into the Post if the user doesn't have an existsing reaction
        if (indexOfReaction === -1) {
            post.reactions.push(newReaction)
        }
        // Update the post reaction if the user has an existsing reaction
        if (indexOfReaction !== -1) {
            post.reactions.splice(indexOfReaction, 1, newReaction)
        }
        // Remove the user's existsing reaction if the new reaction is an empty string
        if (indexOfReaction !== -1 && reaction.trim() == '') {
            post.reactions.splice(indexOfReaction, 1)
        }

        // Save the changes to the database
        await post.save();
        // Return a success response
        res.status(200).json({ message: 'Reaction to Post successfully', data: post.reactions })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error Reacting To Post' })
    }
}
