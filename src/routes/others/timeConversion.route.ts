import { getVehicleSpecificDatesController } from '@/controllers/others/getVehicleSpecificDates.controller';
import { emailTimeConversionController } from '@/controllers/timeConversions/EmailTime.controller';
import { searchTimeConversionController } from '@/controllers/timeConversions/searchTime.controller';
import { turoTimeConversionController } from '@/controllers/timeConversions/turoTime.controller';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';

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
 *     VehicleSpecificTimeConversion:
 *       type: object
 *       required:
 *         - localDateAndStartTimeArr
 *         - localDateAndEndTimeArr
 *         - zipCodeArr
 *         - localTimeZoneOffsetInMinutes
 *       properties:
 *         localDateAndStartTimeArr:
 *           type: array
 *           description: Array of Start times
 *         localDateAndEndTimeArr:
 *           type: array
 *           description: Array of End times
 *         zipCodeArr:
 *           type: array
 *           description: Array of coresponding zipcodes
 *         localTimeZoneOffsetInMinutes:
 *           type: number
 *           description: Timezone offset from UTC in minutes
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

const timeConversionRouter = express.Router();

const turoTimeConversionSchema = z.object({
    turoStartTime: z.string({ required_error: 'Turo start time is required' }).optional(),
    turoEndTime: z.string({ required_error: 'Turo end time is required' }).optional(),
    zipCode: z.string({ required_error: 'Zipcode is required' }),
    startTS: z.string({ invalid_type_error: 'startTS is required' }).optional(),
    endTS: z.string({ invalid_type_error: 'EndTS is required' }).optional()
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
timeConversionRouter.post('/turoTimeConversion', zodValidate(turoTimeConversionSchema), turoTimeConversionController);

const emailTimeConversionSchema = z.object({
    zipCode: z.string({ required_error: 'Zipcode is required' }),
    tripST: z.string({ required_error: 'tripST time is required' }),
    tripET: z.string({ required_error: 'tripET time is required' })
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
timeConversionRouter.post('/emailTimeConversion', zodValidate(emailTimeConversionSchema), emailTimeConversionController);

const searchTimeConversionSchema = z.object({
    latitude: z.string({ invalid_type_error: 'Latitude is required' }),
    longitude: z.string({ invalid_type_error: 'Longitude is required' }),
    startDate: z.string({ required_error: 'Start date is required' }),
    startTime: z.string({ required_error: 'Start time is required' }),
    endDate: z.string({ required_error: 'End date is required' }),
    endTime: z.string({ required_error: 'End time is required' }),
    zipCode: z.string({ invalid_type_error: 'Zipcode is required' })
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
timeConversionRouter.post('/searchTimeConversion', zodValidate(searchTimeConversionSchema), searchTimeConversionController);

const vehicleSpecificDatesSchema = z.object({
    localDateAndStartTimeArr: z.array(z.string()),
    localDateAndEndTimeArr: z.array(z.string()),
    zipCodeArr: z.array(z.string()),
    localTimeZoneOffsetInMinutes: z.number().optional()
});

/**
 * @swagger
 * /api/v1/timeConversions/vehicleSpecificTimeConversion:
 *   post:
 *     summary: Convert to vehicle specific time
 *     tags: [Time Conversion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleSpecificTimeConversion'
 *           example:
 *                 localDateAndStartTimeArr: ["2024-08-29 01:30:00+00"]
 *                 localDateAndEndTimeArr: ["2024-08-31 01:30:00+00"]
 *                 zipCodeArr: ["73301"]
 *                 localTimeZoneOffsetInMinutes: -330
 *     responses:
 *       200:
 *         description: Successful time conversion
 *       400:
 *         description: Bad request
 */
timeConversionRouter.post('/vehicleSpecificTimeConversion', zodValidate(vehicleSpecificDatesSchema), getVehicleSpecificDatesController);

export default timeConversionRouter;
