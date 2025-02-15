const { createUser, upload } = require('../controllers/userController');
// const upload = require('../utils/multer');

const router = require('express').Router();

router.post('/user', upload.single('profilePicture'), createUser);

module.exports = router;
