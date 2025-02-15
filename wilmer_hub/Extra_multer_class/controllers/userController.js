const userModel = require('../models/user');
const multer = require('multer');
// configure the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './profileImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
// config the file type to be accepted
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type: Image Only'))
    }
};
// Configure the file limit
const limits = {
    limits: 1024 * 1024 * 10
};

exports.upload = multer({
    storage,
    fileFilter,
    limits
})

// module.exports = upload

exports.createUser = async (req, res) => {
    try {
        // Extract the required fields from the request body
        const { fullName, email } = req.body;
        const userExists = await userModel.findOne( { email: email.toLowerCase() } )
        if (userExists) {
            return res.status(400).json({
                message: `User with Email: ${email} already exists`
            })
        }
        const user = await userModel.create({
            fullName,
            email: email.toLowerCase(),
            profilePicture: req.file.originalname
        });

        // Send a success response
        res.status(200).json({
            message: 'User created successfully',
            data: user
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error creating User: ' + error.message
        })
    }
}