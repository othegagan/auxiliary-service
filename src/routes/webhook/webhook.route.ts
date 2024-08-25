import express from 'express';

const webhookRouter = express.Router();

webhookRouter.post('/', webhookRouter);

export default webhookRouter;
