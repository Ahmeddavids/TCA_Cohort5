const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    try {
        // Get the Token from the authorization headers
        const auth = req.headers.authorization;
        if (!auth) {return res.status(400).json({message: 'Token not found'})
        }
        // Make sure the token is a valid JWT token
        const token = auth.split(' ')[1];
        if (!token) {return res.status(400).json({message: 'Invalid Token'})
        }
        // Verify the token to be sure it's still valid
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        // Check if the user is still existing
        const user = await userModel.findById(decodedToken.userId);
        if (!user) {
            return res.status(400).json({
                message: 'Authentication Failed: User not found'
            })
        }
        // Pass the payload to the Request User Object
        req.user = decodedToken;
        // Call the next function
        next();

    } catch (error) {
        console.log(error.message)
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({
                message: 'Session timed-out, Please login to continue'
            })
        }
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}


exports.authenticateAdmin = async (req, res, next) => {
    try {
        // Get the Token from the authorization headers
        const auth = req.headers.authorization;
        // Make sure the token is a valid JWT token
        const token = auth.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                message: 'Invalid Token'
            })
        }
        // Verify the token to be sure it's still valid
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        // Check if the user is still existing
        const user = await userModel.findById(decodedToken.userId);
        if (!user) {
            return res.status(400).json({
                message: 'Authentication Failed: User not found'
            })
        }
        if (user.isAdmin === false) {
            return res.status(401).json({
                message: "Unathorized: You're not allowed to perform this action. "
            })
        }
        // Pass the payload to the Request User Object
        req.user = decodedToken;
        // Call the next function
        next();

    } catch (error) {
        console.log(error.message)
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({
                message: 'Session timed-out, Please login to continue'
            })
        }
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
