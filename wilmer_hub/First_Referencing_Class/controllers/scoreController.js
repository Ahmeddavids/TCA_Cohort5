const scoreModel = require('../models/score');
const userModel = require('../models/user');

exports.createScore = async (req, res) => {
    try {
        // Get the user ID from the Params
        const userId = req.params.id;
        // Extract the required data from the request body
        const { punctuality, assignment, personalDefence, attendance, classAssessment } = req.body;
        // Make sure user fill in all details
        if (!punctuality || !assignment || !attendance || !classAssessment || !personalDefence) {
            return res.status(400).json({
                message: 'Please enter all details'
            })
        }
        // Check if user Exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        // Get the existing user records and use te total to calculate the week
        const userRecords = await scoreModel.find({ userId: userId });

        // Create an Instance  of the record and save
        const scoreRecord = await scoreModel.create({
            punctuality,
            assignment,
            personalDefence,
            attendance,
            classAssessment,
            week: userRecords.length + 1,
            userId
        });

        // Reflect the new score in the user document
        user.scoreId.push(scoreRecord._id)
        // Save the changes applied to user to the database
        await user.save();
        // Send a success response
        res.status(201).json({
            message: `Score for week: ${scoreRecord.week} added successfully`,
            data: scoreRecord
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
};

exports.getOneScore = async (req, res) => {
    try {
        // Extract the score ID from the params
        const { id } = req.params
        // Check if its found or not
        const score = await scoreModel.findById(id).populate('userId', ['firstName', "lastName"]);
        if (!score) {
            return res.status(404).json({
                message: 'Score not found'
            })
        }
         // Send a success response
         res.status(200).json({
            message: `Score for week: ${score.week} found`,
            data: score
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
}