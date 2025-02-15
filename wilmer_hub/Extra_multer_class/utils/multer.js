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

const upload = multer({
    storage,
    fileFilter,
    limits
})

module.exports = upload