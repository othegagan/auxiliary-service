import { getClientAccessToken } from '@/controllers/chat/getClientAccessToken.controller';
import tokenAuth from '@/middlewares/tokenAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';
const getClientAccessTokenRouter = express.Router();
const schema = z.object({
    serviceId: z.string({ required_error: 'Service ID is required', invalid_type_error: 'Service ID must be a string' })
});
/**
 * @swagger
 *   /getClientAccessToken:
 *     post:
 *       summary: Get client access token for a service
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
 *           description: Successful response with client access token
 *         400:
 *           description: Bad request (invalid input)
 *         401:
 *           description: Unauthorized
 *         500:
 *           description: Server error
 * */
getClientAccessTokenRouter.post('/', tokenAuth, zodValidate(schema), getClientAccessToken);
export default getClientAccessTokenRouter;
//# sourceMappingURL=getClientAccessToken.route.js.map