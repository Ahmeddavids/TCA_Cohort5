const { register, verifyUser, resendVerificationEmail, login, getAll, makeAdmin } = require('../controllers/userController');
const { authenticate, superAdminAuth } = require('../middlewares/authentication');

const router = require('express').Router();

router.post('/register', register);

router.get('/verify-user/:token', verifyUser);

router.post('/login', login);

router.post('/resend-verification', resendVerificationEmail);

router.get('/users', authenticate, getAll);

router.patch('/make-admin/:id', authenticate, superAdminAuth, makeAdmin);

module.exports = router