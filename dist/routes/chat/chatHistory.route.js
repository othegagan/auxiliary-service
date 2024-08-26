"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllChatHistoryFluxRouter = exports.getAllChatHistoryRouter = void 0;
const chatHistory_controller_1 = require("../../controllers/chat/chatHistory.controller.js");
const passwordAuth_middleware_1 = require("../../middlewares/passwordAuth.middleware.js");
const tokenAuth_middleware_1 = __importDefault(require("../../middlewares/tokenAuth.middleware.js"));
const zodValidate_1 = require("../../utils/zodValidate.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const schema = zod_1.z.object({
    tripId: zod_1.z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' }),
    count: zod_1.z.number({ required_error: 'Count is required', invalid_type_error: 'Count must be a number' }).default(100)
});
const getAllChatHistoryRouter = express_1.default.Router();
exports.getAllChatHistoryRouter = getAllChatHistoryRouter;
const getAllChatHistoryFluxRouter = express_1.default.Router();
exports.getAllChatHistoryFluxRouter = getAllChatHistoryFluxRouter;
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
getAllChatHistoryRouter.post('/', tokenAuth_middleware_1.default, (0, zodValidate_1.zodValidate)(schema), chatHistory_controller_1.chatHistory);
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
getAllChatHistoryFluxRouter.post('/', passwordAuth_middleware_1.passwordAuth, (0, zodValidate_1.zodValidate)(schema), chatHistory_controller_1.chatHistory);
//# sourceMappingURL=chatHistory.route.js.map