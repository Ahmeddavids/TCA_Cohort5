// Import mongoose
const mongoose = require('mongoose');

// Define the Schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    
}, {timestamps: true});
// Define the model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
