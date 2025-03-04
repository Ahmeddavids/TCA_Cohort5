// Import Mongoose
const mongoose = require('mongoose');
// Require Dotenv
require('dotenv').config();
// Call the MONGODB_URI from the env file
const DB = process.env.MONGODB_URI;
// Connect to mongoDb
mongoose.connect(DB)
.then(()=> {
    console.log('Database connected successfully')
})
// Catch errors
.catch((error)=> {
    console.log('Error connecting to database: ' + error.message)
})