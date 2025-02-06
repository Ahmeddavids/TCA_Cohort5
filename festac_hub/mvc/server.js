// Import Express
const express = require('express');
// Create our PORT
const PORT = 1010;
// Import our router
const router = require('./router/router');
// Instantiate Express
const app = express();
// Use the Express body-parser
app.use(express.json())
// Use the router
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`)
})
