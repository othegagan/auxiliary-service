import { getHostAccessToken } from '../../controllers/chat/getHostAccessToken.controller.js';
import tokenAuth from '../../middlewares/tokenAuth.middleware.js';
import { zodValidate } from '../../utils/zodValidate.js';
import express from 'express';
import { z } from 'zod';
const getHostAccessTokenRouter = express.Router();
const schema = z.object({
    serviceId: z.string({ required_error: 'Service ID is required', invalid_type_error: 'Service ID must be a string' })
});
getHostAccessTokenRouter.post('/', tokenAuth, zodValidate(schema), getHostAccessToken);
export default getHostAccessTokenRouter;
