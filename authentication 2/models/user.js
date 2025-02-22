const mongoose  = require('mongoose');


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        require: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    
},{timestamps: true});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
