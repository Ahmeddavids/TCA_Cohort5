const { createUser, getAll, getOne, getUserAndTheirOrders, getUserAndTheirOrdersByName } = require('../controllers/userController');

// Require the router method directly
const router = require('express').Router();
// Sign up route
router.post('/sign-up', createUser);
// Get all users route
// router.get('/user', getAll);
// // Get One User route
// router.get('/user/:id', getOne);
// // Get a User with their Orders
// router.get('/user-with-order/:id', getUserAndTheirOrders);
// // Get user with name
// router.get('/user-order/:name', getUserAndTheirOrdersByName);

// Export the router
module.exports = router