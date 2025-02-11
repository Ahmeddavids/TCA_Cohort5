const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ahmeddavids6:cohort5@cohort5.9vnvq.mongodb.net/First_Referencing_Class')
.then(() => {
    console.log(`Connection to database successfull`)
})
.catch((error) => {
    console.log('Error connecting to database: ' + error.message)
})
