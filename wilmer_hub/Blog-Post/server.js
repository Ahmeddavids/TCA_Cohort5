const express = require('express');
require('./config/database');
const PORT = process.env.PORT || 8080;
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

const app = express();

app.use(express.json());

app.use('/api/v1',postRouter);
app.use('/api/v1',userRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening to PORT: ${PORT}`)
});
