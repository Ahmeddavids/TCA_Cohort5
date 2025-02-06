const { Sequelize } = require('sequelize')

// Create a new instance of sequelize
const sequelize = new Sequelize('sequelize_part2', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;