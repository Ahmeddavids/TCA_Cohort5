const express = require('express');
const { register, login, verifyUser, resendVerificationEmail } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);

// router.post('/login', login);

router.get('/user-verify/:token', verifyUser);

// router.post('/resend-verification/', resendVerificationEmail);

module.exports = router
