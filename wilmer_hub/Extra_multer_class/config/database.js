const mongoose = require('mongoose');
require('dotenv').config();
const DB = process.env.MONGODB_URI

mongoose.connect(DB).then(() => {
    console.log('Connection to database is successfull');
}).catch((err) => {
    console.log('Error connecting to database: ' + err.message);

})