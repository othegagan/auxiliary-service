import { clientSendMessage, hostSendMessage, systemSendMessage } from '../../controllers/chat/message.controller.js';
import { passwordAuth } from '../../middlewares/passwordAuth.middleware.js';
import tokenAuth from '../../middlewares/tokenAuth.middleware.js';
import { zodValidate } from '../../utils/zodValidate.js';
import express from 'express';
import { z } from 'zod';
const schema = z.object({
    tripId: z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' }),
    message: z.string({ message: 'Message is required' }).trim()
});
const clientSendMessageRouter = express.Router();
clientSendMessageRouter.post('/', tokenAuth, zodValidate(schema), clientSendMessage);
const hostSendMessageRouter = express.Router();
hostSendMessageRouter.post('/', tokenAuth, zodValidate(schema), hostSendMessage);
const systemSendMessageRouter = express.Router();
systemSendMessageRouter.post('/', passwordAuth, zodValidate(schema), systemSendMessage);
const clientSendMessageFluxRouter = express.Router();
clientSendMessageFluxRouter.post('/', passwordAuth, zodValidate(schema), clientSendMessage);
export { clientSendMessageRouter, hostSendMessageRouter, systemSendMessageRouter, clientSendMessageFluxRouter };
