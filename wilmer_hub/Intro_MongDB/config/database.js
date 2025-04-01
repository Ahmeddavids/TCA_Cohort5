// Import Mongoose
const mongoose = require('mongoose');
// Connect to MongoDB URI
mongoose.connect('first-mongoose-class')
.then(() => {
    console.log('Connection to database is successfull');
})
.catch((error) => {
    console.log(error.message);
})
