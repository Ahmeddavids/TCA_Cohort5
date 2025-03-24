const { createRoom } = require('../controllers/roomController');
const upload = require('../utils/multer');

const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Endpoints for managing rooms
 */

/**
 * @swagger
 * /api/v1/room/{id}:
 *   post:
 *     summary: Create a new room (Admin Only)
 *     description: Adds a new room to a specified category. **Requires Admin Authentication.**
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to which the room belongs
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *               price:
 *                 type: number
 *               roomNumber:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Room successfully added.
 *       400:
 *         description: Invalid request data.
 *       403:
 *         description: Forbidden - Admin access required.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/room/:id', upload.array('images', 10), createRoom);

module.exports = router;