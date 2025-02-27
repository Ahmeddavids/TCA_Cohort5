const express = require('express');
const { register, login, verifyUser, resendVerificationEmail, forgotPassword, resetPassword } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/user-verify/:token', verifyUser);

router.post('/forgot-password', forgotPassword);

router.post('/initiate/recover/:token', resetPassword);

// router.post('/resend-verification/', resendVerificationEmail);

module.exports = router
