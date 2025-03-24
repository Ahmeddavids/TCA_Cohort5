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
 * tags:
 *   name: Admin
 *   description: Endpoints for admin management
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
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

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints related to user authentication and management
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and returns a token.
 *     tags: [User]
 *     security: []  # No authentication required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
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
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                 token:
 *                   type: string
 *                   example: jwt_token_here
 *       400:
 *         description: Invalid password or missing credentials.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/login', login);

router.post('/resend-verification', resendVerificationEmail);


/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all registered users. **Requires authentication.**
 *     tags: [User]
 *     security:
 *       - bearerAuth: []  # Authentication required
 *     responses:
 *       200:
 *         description: Returns all users in the database.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       500:
 *         description: Internal Server Error.
 */

router.get('/users', authenticate, getAll);

/**
 * @swagger
 * /api/v1/make-admin/{id}:
 *   patch:
 *     summary: Make a user an admin
 *     description: Grants admin privileges to a user. **Requires authentication and Super Admin role.**
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to be made an admin
 *     responses:
 *       200:
 *         description: User successfully promoted to admin.
 *       400:
 *         description: User is already an admin.
 *       401:
 *         description: Unauthorized - No token provided or insufficient privileges.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */

router.patch('/make-admin/:id', authenticate, superAdminAuth, makeAdmin);
/**
 * @swagger
 * /api/v1/google-authenticate:
 *   get:
 *     summary: Google Authentication
 *     description: Redirects to Google's authentication page. **No authentication required.**
 *     tags: [User]
 *     security: []  # No authentication required
 *     responses:
 *       302:
 *         description: Redirects to Google authentication.
 */
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
 * /api/v1:
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

router.get('/api/v1', (req, res) => {
    res.send('Welcome to the Cloud View Hotel Home Page');
});


module.exports = router