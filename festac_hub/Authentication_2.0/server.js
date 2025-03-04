const express = require('express');
require('./config/database');
const userRouter = require('./routes/userRouter');
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/api/v1', userRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening to PORT: ${PORT}`)
})
