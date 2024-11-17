import { clientSendMessage, hostSendMessage, systemSendMessage } from '@/controllers/chat/message.controller';
import { passwordAuth } from '@/middlewares/passwordAuth.middleware';
import tokenAuth from '@/middlewares/tokenAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';
const schema = z.object({
    tripId: z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' }),
    message: z.string({ message: 'Message is required' }).trim()
});
const clientSendMessageRouter = express.Router();
const hostSendMessageRouter = express.Router();
const systemSendMessageRouter = express.Router();
const clientSendMessageFluxRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Chat
 *     description: Chat operations
 *   - name: Chat.Send Message
 *     description: Send message operations
 *
 * components:
 *   schemas:
 *     SendMessageRequest:
 *       type: object
 *       required:
 *         - tripId
 *         - message
 *       properties:
 *         tripId:
 *           type: number
 *           description: The ID of the trip
 *         message:
 *           type: string
 *           description: The message to send
 *     SendMessageResponse:
 *       type: object
 *       properties:
 *         messageId:
 *           type: string
 *           description: The ID of the sent message
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /clientSendMessage:
 *   post:
 *     summary: Send a message as a client
 *     tags: [Chat.Send Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendMessageRequest'
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendMessageResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /hostSendMessage:
 *   post:
 *     summary: Send a message as a host
 *     tags: [Chat.Send Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendMessageRequest'
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendMessageResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /systemSendMessage:
 *   post:
 *     summary: Send a message as the system
 *     tags: [Chat.Send Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/SendMessageRequest'
 *               - type: object
 *                 properties:
 *                   password:
 *                     type: string
 *                     description: The password for the service
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendMessageResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /clientSendMessageFlux:
 *   post:
 *     summary: Send a message as a client (flux)
 *     tags: [Chat.Send Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/SendMessageRequest'
 *               - type: object
 *                 properties:
 *                   password:
 *                     type: string
 *                     description: The password for the service
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendMessageResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
clientSendMessageFluxRouter.post('/', passwordAuth, zodValidate(schema), clientSendMessage);
clientSendMessageRouter.post('/', tokenAuth, zodValidate(schema), clientSendMessage);
hostSendMessageRouter.post('/', tokenAuth, zodValidate(schema), hostSendMessage);
systemSendMessageRouter.post('/', passwordAuth, zodValidate(schema), systemSendMessage);
export { clientSendMessageRouter, hostSendMessageRouter, systemSendMessageRouter, clientSendMessageFluxRouter };
//# sourceMappingURL=message.route.js.map