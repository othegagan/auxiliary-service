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
const getAllChatHistoryFluxRouter = express.Router();

/**
 * @swagger
 * /getAllChatHistory:
 *   post:
 *     summary: Get chat history for a trip
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
 *               - count
 *             properties:
 *               tripId:
 *                 type: number
 *                 description: The ID of the trip
 *               count:
 *                 type: number
 *                 description: The number of messages to retrieve
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           required: true
 *           schema:
 *             type: string
 *           description: Bearer token for authentication
 *     responses:
 *       200:
 *         description: Successful response with chat history
 *       400:
 *         description: Bad request (invalid input)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * */
getAllChatHistoryRouter.post('/', tokenAuth, zodValidate(schema), chatHistory);

/**
 * @swagger
 * /getAllChatHistoryFlux:
 *   post:
 *     summary: Get chat history for a trip (flux)
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
 *               - count
 *             properties:
 *               tripId:
 *                 type: number
 *                 description: The ID of the trip
 *               count:
 *                 type: number
 *                 description: The number of messages to retrieve
 *     responses:
 *       200:
 *         description: Successful response with chat history
 *       400:
 *         description: Bad request (invalid input)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * */
getAllChatHistoryFluxRouter.post('/', passwordAuth, zodValidate(schema), chatHistory);

export { getAllChatHistoryRouter, getAllChatHistoryFluxRouter };
