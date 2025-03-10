const { createCategory } = require('../controllers/categoryController');
const { authenticate, adminAuth } = require('../middlewares/authentication');
const router = require('express').Router();

router.post('/category', authenticate, adminAuth, createCategory)

module.exports = router;
