const express = require('express');
const PORT = 3000;

const app = express();
app.use(express.json());

const clubs = [
    {
        id: 1,
        name: String,
        color: Number,
        coach: null
    },
    {
        id: 2,
        name: 'Barcelona',
        color: 'Blue and Red',
        coach: 'Hansi Flick'
    }
]


app.get('/clubs', (req, res) => {
    res.status(200).json({
        message: 'All clubs in the database',
        data: clubs
    })
});

app.post('/clubs', (req, res) => {
    // Get the data from the Request object
    const data  = req.body;
    // Automaticallyh assign the ID 
    data.id = clubs.length + 1 ;
    // Push the data to the Clubs array
    clubs.push(data);
    // Send a response to the User
    res.status(200).json({
        message: 'Club added successfully',
        data: clubs
    })
    
})

app.listen(PORT, () => {
    console.log(`Sever is running on PORT: ${PORT}`);
    
})