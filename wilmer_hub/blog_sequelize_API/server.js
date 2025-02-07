// Import Express Framework
const express = require('express');
// Import sequelize configuration
const sequelize = require('./database/sequelize');
// Create PORT
const PORT = 1153;
// Import Routers
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');

// Instantiate Express
const app = express();
// Use the Express Body-Parser Middleware
app.use(express.json());

app.use(userRouter);
app.use(commentRouter);
app.use(postRouter);

const database = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

database()
// Listen to PORT
app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
})