const {Sequelize}  = require('sequelize');


const sequelize = new Sequelize('blog_post', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = sequelize