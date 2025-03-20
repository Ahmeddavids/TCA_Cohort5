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


// const UAParser = require('ua-parser-js');
// const useragent = require('express-useragent');

// app.get('/device-info', (req, res) => {
//     try {
//         const parser = new UAParser(req.headers['user-agent']);
//         const userAgent = useragent.parse(req.headers['user-agent']);

//         // Extract Device Information
//         const deviceInfo = {
//             ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip,
//             browser: {
//                 name: parser.getBrowser().name || "Unknown",
//                 version: parser.getBrowser().version || "Unknown"
//             },
//             os: {
//                 name: parser.getOS().name || "Unknown",
//                 version: parser.getOS().version || "Unknown"
//             },
//             device: {
//                 type: userAgent.isMobile ? "Mobile" : userAgent.isTablet ? "Tablet" : "Desktop",
//                 vendor: parser.getDevice().vendor || "Unknown",
//                 model: parser.getDevice().model || "Unknown",
//                 architecture: parser.getCPU().architecture || "Unknown"
//             },
//             network: {
//                 isProxy: req.headers['via'] ? true : false,
//                 isVPN: req.headers['x-vpn'] ? true : false // Custom headers from some VPNs
//             },
//             language: req.headers['accept-language'] || "Unknown",
//             timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
//             headers: req.headers // Include all headers for debugging/testing
//         };

//         res.status(200).json({
//             message: "Device Information Retrieved",
//             deviceInfo
//         });
//     } catch (error) {
//         console.error("Error fetching device info:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });
