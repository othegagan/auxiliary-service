import { priceCalculationController } from '@/controllers/booking/priceCalculation.controller';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';

const priceCalculationRouter = express.Router();

const schema = z.object({
    vehicleid: z.number({ required_error: 'Vehicle ID is required', invalid_type_error: 'Vehicle ID must be a number' }),
    startTime: z.string({ required_error: 'Start time is required', invalid_type_error: 'Start time must be a valid date-time' }),
    endTime: z.string({ required_error: 'End time is required', invalid_type_error: 'End time must be a valid date-time' }),
    airportDelivery: z.boolean({ required_error: 'Airport delivery is required' }),
    customDelivery: z.boolean({ required_error: 'Custom delivery is required' }),
    hostid: z.number({ required_error: 'Host ID is required', invalid_type_error: 'Host ID must be a number' }),
    tripid: z.number().optional().nullable(),
    zipCode: z.string({ required_error: 'Zip code is required' })
});

/**
 * @swagger
 * /api/v1/priceCalculation:
 *   post:
 *     summary: Price calculation
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicleid
 *               - startTime
 *               - endTime
 *               - airportDelivery
 *               - customDelivery
 *               - hostid
 *               - tripid
 *               - zipCode
 *             properties:
 *               vehicleid:
 *                 type: number
 *                 description: Vehicle ID
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Start time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: End time
 *               airportDelivery:
 *                 type: boolean
 *                 description: Airport delivery
 *               customDelivery:
 *                 type: boolean
 *                 description: Custom delivery
 *               hostid:
 *                 type: number
 *                 description: Host ID
 *               tripid:
 *                 type: number
 *                 nullable: true
 *                 description: Trip ID
 *               zipCode:
 *                 type: string
 *                 description: Zip code
 *           example:
 *             vehicleid: 250
 *             startTime: "2024-04-11T15:00:00"
 *             endTime: "2024-04-17T19:00:00"
 *             airportDelivery: false
 *             customDelivery: false
 *             hostid: 1418
 *             tripid: null
 *             zipCode: "73301"
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
priceCalculationRouter.post('/', zodValidate(schema), priceCalculationController);

export default priceCalculationRouter;
