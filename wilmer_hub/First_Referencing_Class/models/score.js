const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    week: {
        type: Number,
    },
    punctuality: {
        type: Number,
    },
    assignment: {
        type: Number,
    },
    attendance: {
        type: Number,
    },
    personalDefence: {
        type: Number,
    },
    classAssessment: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    },
},{timestamps: true});

const scoreModel = mongoose.model('Scores', scoreSchema);

module.exports = scoreModel
