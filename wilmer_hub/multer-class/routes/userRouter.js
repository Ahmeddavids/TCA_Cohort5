const express = require('express');
const { createUser, getOneUser, update } = require('../controllers/userController');
const upload = require('../utils/multer');
const router = express.Router();

router.post('/user', upload.single('image'), createUser)

router.get('/user/:id', getOneUser)

router.patch('/user/:id', upload.single('image'), update)

module.exports = router;
