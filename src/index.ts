import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from '@/configs/env';
import { errorHandler } from '@/utils/errorHandler';
import logger from '@/utils/logger';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Application } from 'express';
import { specs, swaggerUi } from './configs/swagger';
import mainRouter from './mainRouter';
import getLogsRouter from './routes/getLogs.route';
import testRouter from './routes/others/test.route';
import enhancedLogger from './utils/enhancedLogger';
import { getAppVersion } from './utils/lib';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { initializeSocket } from './controllers/others/drivingLicenceSocket.controller';

// Load environment variables based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: `${envFile}` });

const app: Application = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'User-Agent', 'X-Requested-With'],
        credentials: true
    }
});

// Initialize socket connections
initializeSocket(io);

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Get the current file URL and convert it to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Log requests and responses (except for `/logs` and `/` routes)
app.use((req, res, next) => {
    const excludedRoutes = ['/logs', '/'];

    // Skip logging for the excluded routes
    if (excludedRoutes.includes(req.path)) {
        return next();
    }

    const originalJson = res.json;
    res.json = function (body) {
        enhancedLogger.logRequestResponse(req, res, body);
        return originalJson.call(this, body);
    };

    next();
});

// Default route
app.get('/', async (req, res) => {
    const appVersion = await getAppVersion(); // Await the asynchronous function
    res.json({
        message: `🦄🌈✨🌎 Service 🤖 running in ${env.NODE_ENV} env on port ${env.PORT}. v${appVersion}`
    });
});

app.use('/logs', getLogsRouter);

app.use('/test', testRouter);

// Main application routes
app.use('/', mainRouter);

// Error handler middleware
app.use(errorHandler);

const PORT = env.PORT || 5000;

server.listen(PORT, () => {
    logger.info(`Server is running in ${env.NODE_ENV} mode on port ${PORT}`);
});
