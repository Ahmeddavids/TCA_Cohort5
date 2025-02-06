// Import Express framework
const express = require('express');
// Import sequelize instance from database file
const sequelize = require('./database/sequelize');
const clubRouter = require('./routes/clubRouter');
// Declare PORT
const PORT = 1018;

// Instantiate  Express
const app = express();
// Use the Express body-parser middleware
app.use(express.json());

app.use(clubRouter);

const server = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};
// Invoke the server function
server();
// Listen to PORT
app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`)
});