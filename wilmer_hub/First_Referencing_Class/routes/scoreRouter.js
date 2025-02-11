const express = require('express');
const { createScore, getOneScore } = require('../controllers/scoreController');
const router = express.Router();

router.post('/score/:id', createScore);

router.get('/score/:id', getOneScore);

module.exports = router;