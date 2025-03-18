require('dotenv').config();
const mongoose = require('mongoose');
const DB = process.env.MONGODB_URI;
mongoose.connect(DB).then(()=> {
console.log('Connection to database successful')
})
.catch((error)=> {
    console.log('Error connecting to database: ' + error.message)
})
