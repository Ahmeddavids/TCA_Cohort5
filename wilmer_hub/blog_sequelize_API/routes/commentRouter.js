const { createComment, getComment } = require('../controllers/commentController');

const router = require('express').Router();

router.post('/comment/:postId/:userId', createComment);

router.get('/comment/:id', getComment);

module.exports = router;