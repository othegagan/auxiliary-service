import { createConversation } from '@/controllers/createConversation.controller';
import { passwordAuth } from '@/middlewares/passwordAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';
const createConversationRouter = express.Router();
const schema = z.object({
    tripId: z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' })
});
createConversationRouter.post('/', passwordAuth, zodValidate(schema), createConversation);
export default createConversationRouter;
