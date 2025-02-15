require('./config/database');
const express = require('express');
const userRouter = require('./routes/userRouter');
const app = express();
const PORT = 1302

app.use(express.json());
app.use(userRouter);


app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`)
})