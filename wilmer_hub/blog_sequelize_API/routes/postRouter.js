const { createPost, getPost } = require('../controllers/postController');

// Require the router method directly
const router = require('express').Router();
router.post('/post/:id', createPost)
router.get('/post/:id', getPost)
// Export the router
module.exports = router