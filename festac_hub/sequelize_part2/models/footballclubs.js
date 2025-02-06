const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class FootballClubs extends Model {}

FootballClubs.init(
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ucl: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stadium: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coach: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topsix: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'FootballClubs', // We need to choose the model name,
    tableName: "FootballClubs"
  },
);

module.exports = FootballClubs
