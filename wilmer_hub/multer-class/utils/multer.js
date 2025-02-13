// Import Multer
const multer = require('multer');
// Configure the storage
const storage = multer.diskStorage({
    // The destination to store the file
    destination: (req, file, cb) => {
        // Pass the path to store the file
        cb(null, './uploads')
    },
    // The name to store the file with (Which is the original file name)
    filename: (req, file, cb) => {
        // Use the original name of the file
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    // Check the mimetype of the file (For this instance it must be an Image)
    if (file.mimetype.startsWith('image/')) {
        // Return True if it meets the condition
        cb(null, true)
    } else {
        // Throw an Error if the wrong file type is passed
        cb(new Error('Invalid file type, Please upload only Image'))
    }
};
// Define a limit to the file size
const limits = {
    limits: 1024 * 1024 * 10
};
// Pass all the configurations of multer to the Variable upload
const upload = multer({
    storage,
    fileFilter,
    limits
});
// Export the Upload variable which holds the multer cofiguration
module.exports = upload