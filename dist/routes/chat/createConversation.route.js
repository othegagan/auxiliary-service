"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createConversation_controller_1 = require("../../controllers/chat/createConversation.controller.js");
const passwordAuth_middleware_1 = require("../../middlewares/passwordAuth.middleware.js");
const zodValidate_1 = require("../../utils/zodValidate.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const createConversationRouter = express_1.default.Router();
const schema = zod_1.z.object({
    tripId: zod_1.z.number({ required_error: 'Trip ID is required', invalid_type_error: 'Trip ID must be a number' })
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
createConversationRouter.post('/', passwordAuth_middleware_1.passwordAuth, (0, zodValidate_1.zodValidate)(schema), createConversation_controller_1.createConversation);
exports.default = createConversationRouter;
//# sourceMappingURL=createConversation.route.js.map