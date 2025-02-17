const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        const ext = file.mimetype.split('/')[1]
        cb(null, `IMG_${uniqueSuffix}.${ext}`)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type'))
    }
};

const fileSize = {
    limits: 1024 * 1024 * 5
};

const upload = multer({
    storage,
    fileFilter,
    limits: fileSize
});

module.exports = upload;