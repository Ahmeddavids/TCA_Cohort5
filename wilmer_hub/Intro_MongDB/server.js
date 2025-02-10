require('./config/database')
const express = require('express');

const app = express();
const studentRouter = require('./routes/studentRouter');
const PORT = 2121;

app.use(express.json());

app.use(studentRouter);

app.listen(PORT, ()=>{
    console.log(`Server is listening to port ${PORT}`)
});