import { env } from '@/configs/env';
import { swaggerUi, specs } from './configs/swagger';
import { errorHandler } from '@/utils/errorHandler';
import logger, { morganMiddleware } from '@/utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import mainRouter from './mainRouter';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morganMiddleware);
app.use(express.static('public'));

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
