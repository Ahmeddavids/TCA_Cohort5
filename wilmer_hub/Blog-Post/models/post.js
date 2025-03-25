const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    images: [{
        imageUrl: { type: String },
        imagePublicId: { type: String },
    }],
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
        required: true
    },
    user: {
        type: String,
        required: true
    },
    commentIds: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comments'
    }],
    reactions: [{
        username: String,
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },
        reaction: {
            type: String,
            enum: ['Like', 'Love', 'Care', 'Haha', 'Sad', 'Wow', 'Angry']
        }
    }]
}, { timestamps: true });

const postModel = mongoose.model('Posts', postSchema);

module.exports = postModel;
