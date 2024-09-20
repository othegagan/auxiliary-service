"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailTime_controller_1 = require("../../controllers/timeConversions/EmailTime.controller.js");
const searchTime_controller_1 = require("../../controllers/timeConversions/searchTime.controller.js");
const turoTime_controller_1 = require("../../controllers/timeConversions/turoTime.controller.js");
const zodValidate_1 = require("../../utils/zodValidate.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
/**
 * @swagger
 * components:
 *   schemas:
 *     TuroTimeConversion:
 *       type: object
 *       properties:
 *         turoStartTime:
 *           type: string
 *           description: Turo start time
 *         turoEndTime:
 *           type: string
 *           description: Turo end time
 *         zipCode:
 *           type: string
 *           description: Zipcode
 *         startTS:
 *           type: string
 *           description: Start timestamp
 *         endTS:
 *           type: string
 *           description: End timestamp
 *     EmailTimeConversion:
 *       type: object
 *       required:
 *         - zipCode
 *         - tripST
 *         - tripET
 *       properties:
 *         zipCode:
 *           type: string
 *           description: Zipcode
 *         tripST:
 *           type: string
 *           description: Trip start time
 *         tripET:
 *           type: string
 *           description: Trip end time
 *     SearchTimeConversion:
 *       type: object
 *       required:
 *         - latitude
 *         - longitude
 *         - startDate
 *         - startTime
 *         - endDate
 *         - endTime
 *         - zipCode
 *       properties:
 *         latitude:
 *           type: string
 *           description: Latitude
 *         longitude:
 *           type: string
 *           description: Longitude
 *         startDate:
 *           type: string
 *           description: Start date
 *         startTime:
 *           type: string
 *           description: Start time
 *         endDate:
 *           type: string
 *           description: End date
 *         endTime:
 *           type: string
 *           description: End time
 *         zipCode:
 *           type: string
 *           description: Zipcode
 */
const timeConversionRouter = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     TuroTimeConversion:
 *       type: object
 *       required:
 *         - zipCode
 *       properties:
 *         zipCode:
 *           type: string
 *           description: Zipcode
 *         startTS:
 *           type: string
 *           format: date-time
 *           description: Start timestamp in ISO 8601 format
 *         endTS:
 *           type: string
 *           format: date-time
 *           description: End timestamp in ISO 8601 format
 *         turoStartTime:
 *           type: string
 *           description: Turo start time in a specific format
 *         turoEndTime:
 *           type: string
 *           description: Turo end time in a specific format
 *
 */
const turoTimeConversionSchema = zod_1.z.object({
    turoStartTime: zod_1.z.string({ required_error: 'Turo start time is required' }).optional(),
    turoEndTime: zod_1.z.string({ required_error: 'Turo end time is required' }).optional(),
    zipCode: zod_1.z.string({ required_error: 'Zipcode is required' }),
    startTS: zod_1.z.string({ invalid_type_error: 'startTS is required' }).optional(),
    endTS: zod_1.z.string({ invalid_type_error: 'EndTS is required' }).optional()
});
/**
 * @swagger
 * /api/v1/timeConversions/turoTimeConversion:
 *   post:
 *     summary: Convert Turo time
 *     tags: [Time Conversion]
 *     requestBody:
 *       description: Turo Time Conversion request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TuroTimeConversion'
 *           examples:
 *             example1:
 *               summary: "With start(startTS) and end(endTS) timestamps"
 *               value:
 *                 zipCode: "73301"
 *                 startTS: "2024-04-12T12:30:00.000+00:00"
 *                 endTS: "2024-04-14T15:30:00.000+00:00"
 *             example2:
 *               summary: "With turoStartTime and turoEndTime"
 *               value:
 *                 zipCode: "73301"
 *                 turoStartTime: "Fri Apr 26 15:00:00 IST 2024"
 *                 turoEndTime: "Fri Apr 26 10:00:00 IST 2024"
 *     responses:
 *       200:
 *         description: Successful time conversion
 *       400:
 *         description: Bad request
 */
timeConversionRouter.post('/turoTimeConversion', (0, zodValidate_1.zodValidate)(turoTimeConversionSchema), turoTime_controller_1.turoTimeConversionController);
const emailTimeConversionSchema = zod_1.z.object({
    zipCode: zod_1.z.string({ required_error: 'Zipcode is required' }),
    tripST: zod_1.z.string({ required_error: 'tripST time is required' }),
    tripET: zod_1.z.string({ required_error: 'tripET time is required' })
});
/**
 * @swagger
 * /api/v1/timeConversions/emailTimeConversion:
 *   post:
 *     summary: Convert time for email
 *     tags: [Time Conversion]
 *     requestBody:
 *       description: Time Conversion request body for email, messages etc..
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TuroTimeConversion'
 *           example:
 *                 zipCode: "73301"
 *                 tripST: "2024-04-11 15:00:00+00"
 *                 tripET: "2024-04-17 19:00:00+00"
 *     responses:
 *       200:
 *         description: Successful time conversion
 *       400:
 *         description: Bad request
 */
timeConversionRouter.post('/emailTimeConversion', (0, zodValidate_1.zodValidate)(emailTimeConversionSchema), EmailTime_controller_1.emailTimeConversionController);
const searchTimeConversionSchema = zod_1.z.object({
    latitude: zod_1.z.string({ invalid_type_error: 'Latitude is required' }),
    longitude: zod_1.z.string({ invalid_type_error: 'Longitude is required' }),
    startDate: zod_1.z.string({ required_error: 'Start date is required' }),
    startTime: zod_1.z.string({ required_error: 'Start time is required' }),
    endDate: zod_1.z.string({ required_error: 'End date is required' }),
    endTime: zod_1.z.string({ required_error: 'End time is required' }),
    zipCode: zod_1.z.string({ invalid_type_error: 'Zipcode is required' })
});
/**
 * @swagger
 * /api/v1/timeConversions/searchTimeConversion:
 *   post:
 *     summary: Convert search time
 *     tags: [Time Conversion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SearchTimeConversion'
 *           examples:
 *             example1:
 *               summary: "With latitude and longitude"
 *               value:
 *                 latitude: "12.971599"
 *                 longitude: "77.594566"
 *                 startDate: "2024-04-11"
 *                 startTime: "15:00:00"
 *                 endDate: "2024-04-17"
 *                 endTime: "19:00:00"
 *                 zipCode: ""
 *             example2:
 *               summary: "With zipCode"
 *               value:
 *                 latitude: ""
 *                 longitude: ""
 *                 startDate: "2024-04-11"
 *                 startTime: "15:00:00"
 *                 endDate: "2024-04-17"
 *                 endTime: "19:00:00"
 *                 zipCode: "73301"
 *     responses:
 *       200:
 *         description: Successful time conversion
 *       400:
 *         description: Bad request
 */
timeConversionRouter.post('/searchTimeConversion', (0, zodValidate_1.zodValidate)(searchTimeConversionSchema), searchTime_controller_1.searchTimeConversionController);
exports.default = timeConversionRouter;
//# sourceMappingURL=timeConversion.route.js.map