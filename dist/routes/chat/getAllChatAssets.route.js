import { getAllChatAssets } from '../../controllers/chat/getAllChatAssets.controller.js';
import { passwordAuth } from '../../middlewares/passwordAuth.middleware.js';
import { zodValidate } from '../../utils/zodValidate.js';
import express from 'express';
import { z } from 'zod';
const getAllChatAssetsRouter = express.Router();
const schema = z.object({
    tripId: z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' })
});
getAllChatAssetsRouter.post('/', passwordAuth, zodValidate(schema), getAllChatAssets);
export default getAllChatAssetsRouter;
