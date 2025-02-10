const express = require('express');
const { createStudent, getOneStudent, getAllStudents, updateStudentScore, deleteStudent } = require('../controllers/studentController');

const router = express.Router();
// Create student route
router.post('/student', createStudent);
// Get all student route
router.get('/student', getAllStudents);
// Get One student
router.get('/student/:id', getOneStudent);
// Update student score
router.patch('/student/:id', updateStudentScore);
// Delete student
router.delete('/student/:id', deleteStudent);

module.exports = router;
