require('dotenv').config();
const mongoose = require('mongoose');
const DB = process.env.MONGODB_URI;

mongoose.connect(DB)
.then(() => {
    console.log('Connection to Database established successfully')
})
.catch((error) => {
    console.error('Error Connecting to Database: ' + error.message)
})