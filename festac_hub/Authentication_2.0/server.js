const express = require('express');
require('./config/database');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const roomRouter = require('./routes/roomRouter');
const PORT = process.env.PORT;
const secret = process.env.EXPRESS_SESSION_SECRET;
const session = require('express-session');
const passport = require('passport');
require('./middlewares/passport');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();

app.use(express.json());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Cloud View Documentation',
        version: '1.0.0',
        description:
            'Documentation for Cloud View Hotel API for TCA Cohort 5',
        license: {
            name: 'Base URL: https://davids@render.com',
            // url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'Ahmed Davids',
            url: 'https://jsonplaceholder.typicode.com',
        }
    },
    "components": {
        "securitySchemes": {
            "BearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    },
    security: [{ BearerAuth: [] }],
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Production server',
        },
        {
            url: 'http://localhost:1458',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js','server.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: The Home Page of the app
 *     description: Returns a welcome message from Cloud View Hotel.
 *     security: []  # This ensures the route is public (no authentication required)
 *     tags:
 *       - Home
 *     responses:
 *       200:
 *         description: Successfully loads the home page.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Welcome to the Cloud View Hotel Home Page
 */

app.get('/', (req, res) => {
    res.send('Welcome to the Cloud View Hotel Home Page');
});
app.use((error, req, res, next)=> {
if (condition) {
    
}
})

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
