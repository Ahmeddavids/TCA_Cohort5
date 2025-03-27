const { reactToPost } = require('../controllers/reaction');
const { authenticate } = require('../middleware/authentication');

const router = require('express').Router();

router.patch('/react/post/:id', authenticate, reactToPost)

module.exports = router;
