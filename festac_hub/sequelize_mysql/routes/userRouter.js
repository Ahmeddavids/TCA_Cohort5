const { newUser, getAllUsers, getOneUser } = require('../controller/usercontroller');

// Import Express
const router = require('express').Router();


// Create user
router.post('/user', newUser);
// Get all user
router.get('/user', getAllUsers);
// Get one user
router.get('/user/:yid', getOneUser);

module.exports = router;