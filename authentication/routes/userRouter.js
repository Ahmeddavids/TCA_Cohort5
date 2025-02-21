const express = require('express');
const { register, login, verifyEmail, resendVerificationEmail } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/user-verify/:token', verifyEmail);

router.post('/resend-verification/', resendVerificationEmail);

module.exports = router
