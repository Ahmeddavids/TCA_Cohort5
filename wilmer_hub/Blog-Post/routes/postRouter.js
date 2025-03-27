const { createPost, updatePost } = require('../controllers/postController');
const { authenticate } = require('../middleware/authentication');
const upload = require('../utils/multer');

const router = require('express').Router();

router.post('/post/', authenticate, upload.array('images', 20), createPost);

router.patch('/post/:id', authenticate, upload.array('images', 20), updatePost);

module.exports = router;
