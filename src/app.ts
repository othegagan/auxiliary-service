import { errorHandler } from '@/utils/errorHandler';
import { morganMiddleware } from '@/utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { specs, swaggerUi } from './configs/swagger';
import mainRouter from './mainRouter';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morganMiddleware);
app.use(express.static('public'));

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', mainRouter);

// Error handling middleware
app.use(errorHandler);

export default app;
