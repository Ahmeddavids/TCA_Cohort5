const { register } = require('../controllers/userController');
const upload = require('../utils/multer');

const router = require('express').Router();

router.post('/register', upload.single('profilePic'), register);

module.exports = router;
