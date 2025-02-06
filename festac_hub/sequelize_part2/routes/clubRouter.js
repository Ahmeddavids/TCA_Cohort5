// Import Express and extract the router at once
const router = require('express').Router();
// Import your functions from the controller
const { createClub, getAll, getOneClub, updateClub, deleteClub } = require('../controllers/clubsController');

// Create club route
router.post('/club', createClub);
// Get All Clubs Route
router.get('/club', getAll);
// Get one Club Route
router.get('/club/:id', getOneClub);
// Update Club Route
router.patch('/club/:id', updateClub);
// Delete Club Route
router.delete('/club/:id', deleteClub);

module.exports = router;