const express = require('express');
require('./config/database');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const roomRouter = require('./routes/roomRouter');
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/api/v1', roomRouter);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', userRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening to PORT: ${PORT}`)
})
