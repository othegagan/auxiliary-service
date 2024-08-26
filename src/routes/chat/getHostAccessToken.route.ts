import { getHostAccessToken } from '@/controllers/chat/getHostAccessToken.controller';
import tokenAuth from '@/middlewares/tokenAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';

const getHostAccessTokenRouter = express.Router();

const schema = z.object({
    serviceId: z.string({ required_error: 'Service ID is required', invalid_type_error: 'Service ID must be a string' })
});

/**
 * @swagger
 *   /getHostAccessToken:
 *     post:
 *       summary: Get host access token for a service
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
 *                 - serviceId
 *               properties:
 *                 serviceId:
 *                   type: string
 *                   description: The ID of the service
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           required: true
 *           schema:
 *             type: string
 *           description: Bearer token for authentication
 *       responses:
 *         200:
 *           description: Successful response with host access token
 *         400:
 *           description: Bad request (invalid input)
 *         401:
 *           description: Unauthorized
 *         500:
 *           description: Server error
 * */
getHostAccessTokenRouter.post('/', tokenAuth, zodValidate(schema), getHostAccessToken);

export default getHostAccessTokenRouter;
