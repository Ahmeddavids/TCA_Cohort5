// Import Express 
const express = require('express');
// Import our sequlize database configuration
const { sequelize } = require('./database/sequelize');
// Import router into server file
const userRouter = require('./routes/userRouter');

const PORT = 5050;

const app = express();

// Add the express jason middleware
app.use(express.json())

app.use(userRouter);

app.use('/', (req, res) => {
  res.send('Welcome to My sequelize class')
})

// Create an Async function to wrap the database connection
const server = async () => {
  try {
    // Listen to PORT
    app.listen(PORT, () => {
      console.log(`Server is listening to PORT: ${PORT}`);
    });
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}
// Invoke the server function
server();


