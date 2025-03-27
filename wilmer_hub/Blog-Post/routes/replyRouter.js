const { replyComment, replyToAReply, getAll } = require('../controllers/replyController');
const { authenticate } = require('../middleware/authentication');

const router = require('express').Router();

router.post('/reply/create/:id', authenticate, replyComment);

router.post('/reply/:id', authenticate, replyToAReply);

router.get('/reply', authenticate, getAll);

module.exports = router;
