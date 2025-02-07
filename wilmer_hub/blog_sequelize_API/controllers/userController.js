// Import User model 
const userModel = require('../models/user');


// Create a User
exports.createUser = async (req, res) => {
    try {
        // Extract the required fields from the request body
        const { fullName, age, email } = req.body;
        // Check for existing user with their email
        const userExists = await userModel.findOne({ where: { email: email.toLowerCase() } });
        console.log(userExists);

        if (userExists) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        // Create and save a new user instance
        const newUser = await userModel.create({
            fullName,
            age,
            email: email.toLowerCase()
        });
        // Send a success response
        res.status(201).json({
            message: 'User created successfully',
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error" + error.message
        })
    }
};
