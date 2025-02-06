// Import our model
const User = require('../models/user');

// Performing CRUD operations
// Add a new user to the database
exports.newUser = async (req, res) => {
    try {
        // Get the data from the request body
        const { firstName, lastName, age, password, email } = req.body;
        console.log(req.body);

        // Create the new user data into the database
        const newUserData = await User.create({
            firstName,
            lastName,
            age,
            password,
            email
        });
        // Send a success response
        res.status(201).json({
            message: 'User created successfully',
            data: newUserData
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

// Get all users in the database
exports.getAllUsers = async (req, res) => {
    try {
        // Get all the users
        const allUsers = await User.findAll();
        // Send a success response
        res.status(200).json({
            message: 'All users in the database',
            data: allUsers
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Get the user with the ID
        const user = await User.findAll({ where: {id: id}});
        console.log("is Empty?",user.length == 0);
        console.log("User Length",user.length);
        console.log("User Array",user);
        
        if (user.length == 0) {
            // Send a error response
            res.status(404).json({
                message: "User not found"
            })  
        } else { 
            // Send a success response
            res.status(200).json({
                message: 'User found',
                data: user
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

