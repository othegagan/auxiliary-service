import { copyTuroVehicleData, copyTuroVehicleDataServerless } from '@/controllers/turo/copyTuroVehicleData.controller';
import { passwordAuth } from '@/middlewares/passwordAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';
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
const schema = z.object({
    turolink: z.string({ required_error: 'Turo link is required', invalid_type_error: 'Turo link must be a string' }).trim(),
    password: z.string({ required_error: 'Password is required' })
});
const copyTuroVehicleDataRouter = express.Router();
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
copyTuroVehicleDataRouter.post('/', passwordAuth, zodValidate(schema), copyTuroVehicleData);
const copyTuroVehicleDataServerlessRouter = express.Router();
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
copyTuroVehicleDataServerlessRouter.post('/', passwordAuth, zodValidate(schema), copyTuroVehicleDataServerless);
export { copyTuroVehicleDataRouter, copyTuroVehicleDataServerlessRouter };
//# sourceMappingURL=copyTuroVehicleData.route.js.map