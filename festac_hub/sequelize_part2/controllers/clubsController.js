// Import Model
const clubModel = require('../models/footballclubs');
const { v4: uuid } = require('uuid');

// Perform CRUD Operation
// Create a new Club
exports.createClub = async (req, res) => {
    try {
        //  Extract data from the request body
        const { name, ucl, coach, stadium, topsix } = req.body;
        // Check for the club in the database by name
        const clubExists = await clubModel.findAll({ where: { name: name } });
        // Check if the club exists
        if (clubExists.length == 1) {
            res.status(400).json({
                message: `Club with Name: ${name} already exists`
            })
        } else {
            // Create a new instance of the club data to the database
            const newClub = await clubModel.create({
                id: uuid(),
                name,
                ucl,
                coach,
                stadium,
                topsix
            });

            // Send a success response
            res.status(201).json({
                message: 'Club created successfully',
                data: newClub
            });
        }


    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
};

// Read all data in the database
exports.getAll = async (req, res) => {
    try {
        const allClubs = await clubModel.findAll();
        // Send a success response
        res.status(200).json({
            message: 'All clubs in the database',
            data: allClubs,
            total: allClubs.length
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
}

// Get one club by ID
exports.getOneClub = async (req, res) => {
    try {
        // Get the ID from params
        const { id } = req.params;
        // Find the club
        const club = await clubModel.findAll({ where: { id: id } });
        await clubModel.findOne(id)
        if (club.length == 0) {
            res.status(404).json({
                message: 'Club not found'
            })
        } else {
            // Send a success response
            res.status(200).json({
                message: `Club found`,
                data: club
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
}

exports.updateClub = async (req, res) => {
    try {
        // Get the ID from params
        const { id } = req.params;
        // Extract the data from the request body
        const { name, ucl, coach, stadium, topsix } = req.body;
        // Find the club
        const club = await clubModel.findAll({ where: { id: id } });
        // Check if the club exists
        if (club.length == 0) {
            res.status(404).json({
                message: 'Club not found'
            })
        } else {
            const data = {
                name,
                coach,
                stadium,
                ucl,
                topsix
            };
            // Updating the data to the database
            await clubModel.update(data, { where: { id: id } });
            // Fetching that Club to see the changes made
            const updatedClub = await clubModel.findAll({ where: { id: id } });
            
            // Send a success response
            res.status(200).json({
                message: `Club updated successfully`,
                data: updatedClub
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
};

exports.deleteClub = async (req, res) => {
    try {
        // Get the ID from params
        const { id } = req.params;
        // Find the club
        const club = await clubModel.findAll({ where: { id: id } });
        if (club.length == 0) {
            res.status(404).json({
                message: 'Club not found'
            })
        } else {
            // Delete Club from the database
            await clubModel.destroy({ where: { id: id } });
            // Send a success response
            res.status(200).json({
                message: `Club deleted successfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error: ' + error.message
        })
    }
}

