import { createConversation } from '@/controllers/chat/createConversation.controller';
import { passwordAuth } from '@/middlewares/passwordAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';
const createConversationRouter = express.Router();
const schema = z.object({
    tripId: z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' })
});
/**
 * @swagger
 * /createConversation:
 *   post:
 *     summary: Create a new conversation
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tripId
 *               - password
 *             properties:
 *               tripId:
 *                 type: number
 *                 description: The ID of the trip
 *               password:
 *                 type: string
 *                 description:
 *     responses:
 *       200:
 *         description: Conversation created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
createConversationRouter.post('/', passwordAuth, zodValidate(schema), createConversation);
export default createConversationRouter;
//# sourceMappingURL=createConversation.route.js.map