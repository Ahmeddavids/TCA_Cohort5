const express = require('express');
require('./config/database');
const userRouter = require('./routes/userRouter');
const scoreRouter = require('./routes/scoreRouter');
const PORT = 1145;
const app = express();

app.use(express.json());
app.use(scoreRouter)
app.use(userRouter)

app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`)
})
