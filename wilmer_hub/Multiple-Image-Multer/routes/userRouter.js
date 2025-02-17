const { createUser, updateUser } = require('../controllers/userController');
const upload = require('../utils/multer');

const router = require('express').Router();

router.post('/user', upload.array('familyPictures', 5),createUser);

router.patch('/user/:id', upload.array('familyPictures', 5),updateUser);

module.exports = router