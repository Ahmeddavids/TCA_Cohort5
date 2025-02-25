const express = require('express');
require('./config/database');
const userRouter = require('./routes/userRouter');
const scoreRouter = require('./routes/scoreRouter');

const PORT = process.env.PORT || 3050;

const app = express();
app.use(express.json());

app.use('/api/v1',scoreRouter);
app.use('/api/v1',userRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening to PORT: ${PORT}`);
});
