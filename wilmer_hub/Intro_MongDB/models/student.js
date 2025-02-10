// Import Mongoose
const mongoose = require('mongoose')
// Define schema
const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    stack: {
        type: String,
        enum: ['Frontend', 'Backend', 'Product-Design'],
        required: true
    },
    score: {
        type: {
            html: { type: Number },
            css: { type: Number },
            javaScript: { type: Number }
        },
    },
    isPresent: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

const studentModel = mongoose.model('ox', studentSchema);

module.exports = studentModel;