const { Sequelize } = require('sequelize');

exports.sequelize = new Sequelize('festac05', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' 
  });

 