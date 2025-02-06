// Import Express 
const express = require('express');
const { getAll, getOne, createSchool } = require('../controller/schoolController');


const router = express.Router();
// Get all school endpoint
router.get('/schools', getAll);
// Get one school endpoint
router.get('/schools/:id', getOne);
// Create new school 
router.post('/schools', createSchool);

module.exports = router;