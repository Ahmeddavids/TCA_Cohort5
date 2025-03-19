const { register, verifyUser, resendVerificationEmail, login, getAll, makeAdmin } = require('../controllers/userController');
const { authenticate, superAdminAuth } = require('../middlewares/authentication');
const { registerValidation } = require('../middlewares/validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

router.post('/register', registerValidation, register);

router.get('/verify-user/:token', verifyUser);

router.post('/login', login);

router.post('/resend-verification', resendVerificationEmail);

router.get('/users', authenticate, getAll);

router.patch('/make-admin/:id', authenticate, superAdminAuth, makeAdmin);

router.get('/google-authenticate', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/login', passport.authenticate('google'), async (req, res) => {
    console.log('Req User: ', req.user)
    const token = await jwt.sign({ userId: req.user._id, isVerified: req.user.isVerified }, process.env.JWT_SECRET, { expiresIn: '1day' });
    res.status(200).json({
        message: 'Google Auth Login Successful',
        data: req.user,
        token
    });
})

module.exports = router