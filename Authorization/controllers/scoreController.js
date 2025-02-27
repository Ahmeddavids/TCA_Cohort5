const scoreModel = require('../models/score');
const userModel = require('../models/user');

exports.createScore = async (req, res) => {
    try {
        const { userId } = req.params;
        const { punctuality, classAssessment, personalDefence, assignment, attendance } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'Student not found'
            })
        }
        const prevScores = await scoreModel.find({ userId });

        const totalScore = punctuality + assignment + classAssessment + personalDefence + attendance;
        const score = new scoreModel({
            week: prevScores.length + 1,
            punctuality,
            assignment,
            classAssessment,
            personalDefence,
            attendance,
            average: totalScore / 5,
            total: totalScore,
            name: user.fullName,
            userId
        })

        // Save the changes to the database
        await score.save();

        // Send a success response
        res.status(200).json({
            message: 'Score addedd successfully',
            data: score
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

exports.getAllScores = async (req, res) => {
    try {
        const scores = await scoreModel.find();
        res.status(200).json({
            message: 'All scores in the database',
            data: scores
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
exports.getAllScoresByAStudent = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'Student not found'
            })
        }
        const scores = await scoreModel.find({ userId });
        res.status(200).json({
            message: `All scores for ${user.fullName}`,
            data: scores
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
