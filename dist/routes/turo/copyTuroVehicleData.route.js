"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyTuroVehicleDataServerlessRouter = exports.copyTuroVehicleDataRouter = void 0;
const copyTuroVehicleData_controller_1 = require("../../controllers/turo/copyTuroVehicleData.controller.js");
const passwordAuth_middleware_1 = require("../../middlewares/passwordAuth.middleware.js");
const zodValidate_1 = require("../../utils/zodValidate.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
/**
 * @swagger
 * components:
 *   schemas:
 *     CopyTuroVehicleDataInput:
 *       type: object
 *       required:
 *         - turolink
 *         - password
 *       properties:
 *         turolink:
 *           type: string
 *           description: The Turo vehicle link
 *         password:
 *           type: string
 *           description: Password for authentication
 *     CopyTuroVehicleDataResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A success message
 *         data:
 *           type: object
 *           description: The copied vehicle data
 */
const schema = zod_1.z.object({
    turolink: zod_1.z.string({ required_error: 'Turo link is required', invalid_type_error: 'Turo link must be a string' }).trim(),
    password: zod_1.z.string({ required_error: 'Password is required' })
});
const copyTuroVehicleDataRouter = express_1.default.Router();
exports.copyTuroVehicleDataRouter = copyTuroVehicleDataRouter;
/**
 * @swagger
 * /copyTuroVehicleData:
 *   post:
 *     summary: Copy Turo vehicle data
 *     tags: [Turo Vehicle Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CopyTuroVehicleDataInput'
 *     responses:
 *       200:
 *         description: Successfully copied Turo vehicle data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CopyTuroVehicleDataResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
copyTuroVehicleDataRouter.post('/', passwordAuth_middleware_1.passwordAuth, (0, zodValidate_1.zodValidate)(schema), copyTuroVehicleData_controller_1.copyTuroVehicleData);
const copyTuroVehicleDataServerlessRouter = express_1.default.Router();
exports.copyTuroVehicleDataServerlessRouter = copyTuroVehicleDataServerlessRouter;
/**
 * @swagger
 * /copyTuroVehicleDataServerless:
 *   post:
 *     summary: Copy Turo vehicle data (serverless)
 *     tags: [Turo Vehicle Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CopyTuroVehicleDataInput'
 *     responses:
 *       200:
 *         description: Successfully copied Turo vehicle data (serverless)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CopyTuroVehicleDataResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
copyTuroVehicleDataServerlessRouter.post('/', passwordAuth_middleware_1.passwordAuth, (0, zodValidate_1.zodValidate)(schema), copyTuroVehicleData_controller_1.copyTuroVehicleDataServerless);
//# sourceMappingURL=copyTuroVehicleData.route.js.map