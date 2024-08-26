import { getAllChatAssets } from '@/controllers/chat/getAllChatAssets.controller';
import { passwordAuth } from '@/middlewares/passwordAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';

const getAllChatAssetsRouter = express.Router();

const schema = z.object({
    tripId: z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' })
});

/**
 * @swagger
 *   /getAllChatAssets:
 *     post:
 *       summary: Get all chat assets for a trip
 *       tags: [Chat]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - tripId
 *                 - password
 *               properties:
 *                 tripId:
 *                   type: number
 *                   description: The ID of the trip
 *                 password:
 *                   type: string
 *                   description: The password of the trip
 *       responses:
 *         200:
 *           description: Successful response with chat assets
 *         400:
 *           description: Bad request (invalid input)
 *         401:
 *           description: Unauthorized
 *         500:
 *           description: Server error
 * */
getAllChatAssetsRouter.post('/', passwordAuth, zodValidate(schema), getAllChatAssets);

export default getAllChatAssetsRouter;
