const { register, login } = require('../controllers/userController');
const { registerUserValidation } = require('../middleware/validator');
const upload = require('../utils/multer');

const router = require('express').Router();

router.post('/register', upload.single('profilePic'), registerUserValidation, register);

router.post('/login', login);

module.exports = router;
