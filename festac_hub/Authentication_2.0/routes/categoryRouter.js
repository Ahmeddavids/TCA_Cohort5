const { createCategory, getAll } = require('../controllers/categoryController');
const { authenticate, adminAuth } = require('../middlewares/authentication');
const router = require('express').Router();

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     description: Allows an admin to create a new category with amenities. Requires an admin bearer token.
 *     tags:
 *       - CATEGORY
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amenities
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: Deluxe Suite
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of amenities for the category.
 *                 example: ["WiFi", "Air Conditioning", "Mini Bar"]
 *     responses:
 *       201:
 *         description: Category successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category created
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Category ID
 *                     name:
 *                       type: string
 *                     amenities:
 *                       type: array
 *                       items:
 *                         type: string
 *                     createdBy:
 *                       type: object
 *                       properties:
 *                         adminId:
 *                           type: string
 *                         adminName:
 *                           type: string
 *       401:
 *         description: Unauthorized. Admin authentication required.
 *       403:
 *         description: Forbidden. Only admins can create categories.
 */

router.post('/category', authenticate, adminAuth, createCategory)


/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Get all Categories
 *     description: Retrieve a list of all categories, including their details.
 *     tags:
 *       - CATEGORY
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All Categories in the database
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Category ID
 *                       name:
 *                         type: string
 *                         example: Deluxe Suite
 *                       amenities:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["WiFi", "Air Conditioning"]
 *                       createdBy:
 *                         type: object
 *                         properties:
 *                           adminId:
 *                             type: string
 *                           adminName:
 *                             type: string
 */

router.get('/category', getAll)

module.exports = router;
