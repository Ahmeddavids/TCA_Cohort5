// Import the Student Model
const studentModel = require('../models/student');

// Create Student
exports.createStudent = async (req, res) => {
    try {
        // Extract the required fields from the request body
        const { fullName, stack, age } = req.body;
        // Create an Instance of the Student Object
        const student = new studentModel({
            fullName,
            age,
            stack
        });
        // Save the instnce to the database
        await student.save();
        // Send a success response
        res.status(201).json({
            message: 'Student Data created successfully',
            data: student
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        // Fetch the Students from the database
        const students = await studentModel.find();
        // Send a success response
        res.status(200).json({
            message: 'All students in the database',
            data: students
        })

    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        });
    }
};

// Get One student
exports.getOneStudent = async (req, res) => {
    try {
        // Get the Student ID from the request params
        const { id } = req.params;
        // Fetch the Student with the ID from the database
        const student = await studentModel.findById(id);
        // Check if the Student is found
        if (!student) {
            return res.status(404).json({
                message: 'Student not found  '
            })
        }
        // Send a success response
        res.status(200).json({
            message: 'Student found in the database',
            data: student
        })

    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        });
    }
}

//  Update student Score
exports.updateStudentScore = async (req, res) => {
    try {
        // Get the Student ID from the request params
        const { id } = req.params;
      const {html, css, javaScript} = req.body;

      const data = {
        score:{
            html,
            css,
            javaScript
        }
      };
      const updatedScore = await studentModel.findByIdAndUpdate(id, data, {new: true});
        // Check if the Student is not found and updated
        if (!updatedScore) {
            return res.status(404).json({
                message: 'Student not found  '
            })
        }

        // Send a success response
        res.status(200).json({
            message: 'Student score updated successfully',
            data: updatedScore
        })

    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        });
    }
}
// Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        // Get the Student ID from the request params
        const { id } = req.params;
        // Find the student by the ID and Delete
      const deletedStudent = await studentModel.findByIdAndDelete(id);
        // Check if the Student is not found and updated
        if (!deletedStudent) {
            return res.status(404).json({
                message: 'Student not found  '
            })
        }

        // Send a success response
        res.status(200).json({
            message: 'Student deleted successfully'
        })

    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        });
    }
}
