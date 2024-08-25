import { getClientAccessToken } from '@/controllers/chat/getClientAccessToken.controller';
import tokenAuth from '@/middlewares/tokenAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';

const getClientAccessTokenRouter = express.Router();

const schema = z.object({
    serviceId: z.string({ required_error: 'Service ID is required', invalid_type_error: 'Service ID must be a string' })
});

getClientAccessTokenRouter.post('/', tokenAuth, zodValidate(schema), getClientAccessToken);

export default getClientAccessTokenRouter;
