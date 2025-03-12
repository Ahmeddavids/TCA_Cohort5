const { createRoom } = require('../controllers/roomController');
const upload = require('../utils/multer');

const router = require('express').Router();

router.post('/room/:id', upload.array('images', 10), createRoom);

module.exports = router;