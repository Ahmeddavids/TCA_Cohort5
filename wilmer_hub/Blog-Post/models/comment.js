const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Posts",
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        required: true
    },
    replies:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Replies"
    }]
},{timestamps: true});

const commentModel = mongoose.model('Comments', commentSchema);

module.exports = commentModel;
