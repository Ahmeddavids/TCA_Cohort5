const userModel = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        // Extract the required fields from the request body
        const {firstName, lastName, gender, stack} = req.body;
        // Make sure the user is entering all details
        if (!firstName || !lastName || !gender || !stack) {
            return res.status(400).json({
                message: 'Please enter all details'
            })
        }

        // Create a new instance of the user and save to the database
        const user = await userModel.create({
            firstName,
            lastName,
            gender,
            stack
        });
        // Send a success response
        res.status(201).json({
            message: 'User created successfully',
            data: user
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
            
        })
    }
};


exports.getOneUser = async (req, res) => {
    try {
        // Extract the user ID from the params
        const { id } = req.params
        // Check if its found or not
        const user = await userModel.findById(id).populate('scoreId',[ "week", "punctuality", "attendance"]);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
         // Send a success response
         res.status(200).json({
            message: `User found`,
            data: user
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
}
