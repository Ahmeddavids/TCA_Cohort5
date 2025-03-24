const { register, verifyUser, resendVerificationEmail, login, getAll, makeAdmin } = require('../controllers/userController');
const { authenticate, superAdminAuth } = require('../middlewares/authentication');
const { registerValidation } = require('../middlewares/validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = require('express').Router();
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints related to user authentication
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and sends a verification email.
 *     tags: [User]
 *     security: []  # No authentication required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123!
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     fullName:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       400:
 *         description: Email already in use.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/register', registerValidation, register);

/**
 * @swagger
 * /api/v1/verify-user/{token}:
 *   get:
 *     summary: Verify user email
 *     description: Verifies a user's email using the token sent via email.
 *     tags: [User]
 *     security: []  # No authentication required
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token sent to the user's email.
 *     responses:
 *       200:
 *         description: Account verified successfully.
 *       400:
 *         description: User already verified.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */

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

/**
 * @swagger
 * /:
 *   get:
 *     summary: The Home Page of the app
 *     description: Returns a welcome message from Cloud View Hotel.
 *     security: []  # This ensures the route is public (no authentication required)
 *     tags:
 *       - Home
 *     responses:
 *       200:
 *         description: Successfully loads the home page.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Welcome to the Cloud View Hotel Home Page
 */

router.get('/', (req, res) => {
    res.send('Welcome to the Cloud View Hotel Home Page');
});


module.exports = router