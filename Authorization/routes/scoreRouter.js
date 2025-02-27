const express = require('express');
const { authenticate, authenticateAdmin } = require('../middleware/authentication');
const { createScore, getAllScoresByAStudent, getAllScores } = require('../controllers/scoreController');

const router = express.Router();

router.post('/assess/student/:userId', authenticateAdmin, createScore);
router.get('/scores/student/', authenticate, getAllScoresByAStudent);
router.get('/all-scores', authenticateAdmin, getAllScores);

module.exports = router;