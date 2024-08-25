import { chatHistory } from '@/controllers/chat/chatHistory.controller';
import { passwordAuth } from '@/middlewares/passwordAuth.middleware';
import tokenAuth from '@/middlewares/tokenAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';

const schema = z.object({
    tripId: z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' }),
    count: z.number({ required_error: 'Count is required', invalid_type_error: 'Count must be a number' }).default(100)
});

const getAllChatHistoryRouter = express.Router();
getAllChatHistoryRouter.post('/', tokenAuth, zodValidate(schema), chatHistory);

const getAllChatHistoryFluxRouter = express.Router();
getAllChatHistoryFluxRouter.post('/', passwordAuth, zodValidate(schema), chatHistory);

export { getAllChatHistoryRouter, getAllChatHistoryFluxRouter };
