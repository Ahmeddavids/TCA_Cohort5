const { v4: uuid } = require('uuid')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('FootballClubs', [
      {
        id: uuid(),
        name: "Brentford",
        stadium: "Griffin Park",
        coach: "Thomas Frank",
        topsix: false,
        ucl: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FootballClubs', null, {});
  },
}; 