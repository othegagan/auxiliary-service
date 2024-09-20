import { env } from '@/configs/env';
import { errorHandler } from '@/utils/errorHandler';
import logger from '@/utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import { specs, swaggerUi } from './configs/swagger';
import mainRouter from './mainRouter';
import enhancedLogger from './utils/enhancedLogger';

import dotenv from 'dotenv';

// Load environment variables based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: `${envFile}` });

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (body) {
        enhancedLogger.logRequestResponse(req, res, body);
        return originalJson.call(this, body);
    };
    next();
});
// Default
app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨🌎 Service 🤖 running 🌏✨🌈🦄'
    });
});

app.use('/', mainRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server is running in ${env.NODE_ENV} mode on port ${PORT}`);
});
