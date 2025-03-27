const express = require('express');
require('./config/database');
const PORT = process.env.PORT || 8080;
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const replyRouter = require('./routes/replyRouter');
const reactionRouter = require('./routes/reactionRouter');

const app = express();

app.use(express.json());

app.use('/api/v1',reactionRouter);
app.use('/api/v1',replyRouter);
app.use('/api/v1',commentRouter);
app.use('/api/v1',postRouter);
app.use('/api/v1',userRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening to PORT: ${PORT}`)
});
