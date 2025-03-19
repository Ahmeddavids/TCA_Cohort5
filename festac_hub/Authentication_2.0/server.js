const express = require('express');
require('./config/database');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const roomRouter = require('./routes/roomRouter');
const PORT = process.env.PORT;
const secret = process.env.EXPRESS_SESSION_SECRET;
const session = require('express-session');
const passport = require('passport');
require('./middlewares/passport')


const app = express();

app.use(express.json());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', roomRouter);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`)
})
