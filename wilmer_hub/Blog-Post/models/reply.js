const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    reply: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    commentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comments",
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        required: true
    },
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Posts",
        required: true
    },
    replies:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Replies"
    }]
},{timestamps: true});

const replyModel = mongoose.model('Replies', replySchema);

module.exports = replyModel;
