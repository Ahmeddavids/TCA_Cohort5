// Import Mongoose
const mongoose = require('mongoose');
// Connect to MongoDB URI
mongoose.connect('mongodb+srv://ahmeddavids6:cohort5@cohort5.9vnvq.mongodb.net/first-mongoose-class')
.then(() => {
    console.log('Connection to database is successfull');
})
.catch((error) => {
    console.log(error.message);
})
