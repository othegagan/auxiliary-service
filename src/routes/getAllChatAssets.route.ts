import { getAllChatAssets } from '@/controllers/getAllChatAssets.controller';
import { passwordAuth } from '@/middlewares/passwordAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';

const getAllChatAssetsRouter = express.Router();

const schema = z.object({
    tripId: z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' })
});

getAllChatAssetsRouter.post('/', passwordAuth, zodValidate(schema), getAllChatAssets);

export default getAllChatAssetsRouter;
