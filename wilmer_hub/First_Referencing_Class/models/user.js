const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    scoreId: [{
        // type: mongoose.Schema.Types.ObjectId
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Scores'
    }],
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    stack: {
        type: String,
        enum: ['Backend', 'Frontend', 'Product-Design']
    },
},{ timestamps: true});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;