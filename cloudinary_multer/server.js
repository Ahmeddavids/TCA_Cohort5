const express = require('express');
require('./config/database');
const userRouter = require('./routes/userRouter');

const PORT = process.env.PORT || 1010;


const app = express();
app.use(express.json());
app.use(userRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening to PORT: ${PORT}`)
});
