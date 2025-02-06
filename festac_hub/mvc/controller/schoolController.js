// Import Database
const path = './DB/schoolDb.json';
const fs = require('fs');

const readDatabase = () => {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data)
    // return data
}

const writeToDatabase = (data) => {
    fs.writeFileSync(path, data);
}

// Get all schools
const getAll = async (req, res) => {
    try {
        const schoolDB = await readDatabase();

        res.status(200).json({
            message: 'All schools in the database',
            data: schoolDB,
            total: schoolDB.length
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}
// Get one School
const getOne = async (req, res) => {
    try {
        // Get the ID from the request params
        const { id } = req.params;
        // Read the file to get all schools from the DB
        const schoolDB = await readDatabase();
        // Find the school with the ID 
        const school = schoolDB.find((school) => school.id == id);
        // Check if the school exists else throw an Error
        if (school) {
            res.status(200).json({
                message: 'School found',
                data: school,
            })
        } else {
            res.status(404).json({
                message: `School with ID: ${id} Not Found`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}
// Create new SCHOOL
const createSchool = async (req, res) => {
    try {
        // Get the data from the body
        const data = req.body;
        // Read the database
        const schoolDB = await readDatabase();
        // Automatically generate an ID for the new data
        data.id = schoolDB.length + 1;
        // Push the changes to the SchoolDB array
        schoolDB.push(data);
        // console.log(updatedSchools);

        // Persist the changes to the DB file
        writeToDatabase(JSON.stringify(schoolDB, null, 1));
        //  Send a success response
        res.status(200).json({
            message: 'New school added successfully',
            data: schoolDB,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

module.exports = {
    getAll,
    getOne,
    createSchool
};