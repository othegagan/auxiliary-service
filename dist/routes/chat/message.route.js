"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSendMessageFluxRouter = exports.systemSendMessageRouter = exports.hostSendMessageRouter = exports.clientSendMessageRouter = void 0;
const message_controller_1 = require("../../controllers/chat/message.controller.js");
const passwordAuth_middleware_1 = require("../../middlewares/passwordAuth.middleware.js");
const tokenAuth_middleware_1 = __importDefault(require("../../middlewares/tokenAuth.middleware.js"));
const zodValidate_1 = require("../../utils/zodValidate.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const schema = zod_1.z.object({
    tripId: zod_1.z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' }),
    message: zod_1.z.string({ message: 'Message is required' }).trim()
});
const clientSendMessageRouter = express_1.default.Router();
exports.clientSendMessageRouter = clientSendMessageRouter;
const hostSendMessageRouter = express_1.default.Router();
exports.hostSendMessageRouter = hostSendMessageRouter;
const systemSendMessageRouter = express_1.default.Router();
exports.systemSendMessageRouter = systemSendMessageRouter;
const clientSendMessageFluxRouter = express_1.default.Router();
exports.clientSendMessageFluxRouter = clientSendMessageFluxRouter;
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
clientSendMessageFluxRouter.post('/', passwordAuth_middleware_1.passwordAuth, (0, zodValidate_1.zodValidate)(schema), message_controller_1.clientSendMessage);
clientSendMessageRouter.post('/', tokenAuth_middleware_1.default, (0, zodValidate_1.zodValidate)(schema), message_controller_1.clientSendMessage);
hostSendMessageRouter.post('/', tokenAuth_middleware_1.default, (0, zodValidate_1.zodValidate)(schema), message_controller_1.hostSendMessage);
systemSendMessageRouter.post('/', passwordAuth_middleware_1.passwordAuth, (0, zodValidate_1.zodValidate)(schema), message_controller_1.systemSendMessage);
//# sourceMappingURL=message.route.js.map