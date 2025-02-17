const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    familyPictures: [{ type: String, required: true }]
});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;
