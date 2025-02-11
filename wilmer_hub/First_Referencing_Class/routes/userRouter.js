const express = require('express');
const { createUser, getOneUser } = require('../controllers/userController');

const router = express.Router();

router.post('/user', createUser);

router.get('/user/:id', getOneUser);

module.exports = router;
