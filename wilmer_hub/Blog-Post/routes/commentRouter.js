const { createComment, getAll } = require('../controllers/commentController');
const { authenticate } = require('../middleware/authentication');

const router = require('express').Router();

router.post('/comment/:id', authenticate, createComment);

router.get('/comment', getAll);

module.exports = router
