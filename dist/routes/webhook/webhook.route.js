import { webhook } from '../../controllers/insurance/webhook.controller.js';
import express from 'express';
const webhookRouter = express.Router();
webhookRouter.post('/', webhook);
export default webhookRouter;
