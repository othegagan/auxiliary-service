"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getClientAccessToken_controller_1 = require("../../controllers/chat/getClientAccessToken.controller.js");
const tokenAuth_middleware_1 = __importDefault(require("../../middlewares/tokenAuth.middleware.js"));
const zodValidate_1 = require("../../utils/zodValidate.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const getClientAccessTokenRouter = express_1.default.Router();
const schema = zod_1.z.object({
    serviceId: zod_1.z.string({ required_error: 'Service ID is required', invalid_type_error: 'Service ID must be a string' })
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
getClientAccessTokenRouter.post('/', tokenAuth_middleware_1.default, (0, zodValidate_1.zodValidate)(schema), getClientAccessToken_controller_1.getClientAccessToken);
exports.default = getClientAccessTokenRouter;
//# sourceMappingURL=getClientAccessToken.route.js.map