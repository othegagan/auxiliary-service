import { asyncHandler } from '@/utils/asyncHandler';
import { findNearByZipcodesByLatLong, findZipcodeOfLatLong } from '@/utils/lib';
import { zodValidate } from '@/utils/zodValidate';
import express, { Request, Response } from 'express';
import { z } from 'zod';

/**
 * @swagger
 * components:
 *   schemas:
 *     LatLngInput:
 *       type: object
 *       required:
 *         - lat
 *         - lng
 *       properties:
 *         lat:
 *           type: string
 *           description: Latitude
 *         lng:
 *           type: string
 *           description: Longitude
 *     ZipCodeResponse:
 *       type: object
 *       properties:
 *         zipcode:
 *           type: string
 *           description: The zipcode for the given latitude and longitude
 *     ZipCodesResponse:
 *       type: object
 *       properties:
 *         zipcodes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of nearby zipcodes
 */

const schema = z.object({
    lat: z.string({ required_error: 'lat is required' }),
    lng: z.string({ required_error: 'lng is required' })
});

const getZipCodeRouter = express.Router();
const getByZipCodeRouter = express.Router();

/**
 * @swagger
 * /api/v1/availability/getZipCode:
 *   post:
 *     summary: Get zipcode for a given latitude and longitude
 *     tags: [Others]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LatLngInput'
 *     responses:
 *       200:
 *         description: Successfully retrieved zipcode
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZipCodeResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
getZipCodeRouter.post(
    '/',
    zodValidate(schema),
    asyncHandler(async (req: Request, res: Response) => {
        const { lat, lng } = req.validatedData;
        const result = await findZipcodeOfLatLong(lat, lng);
        res.status(200).json({ zipcode: result });
    })
);

/**
 * @swagger
 * /api/v1/availability/getByZipCode:
 *   post:
 *     summary: Get nearby zipcodes for a given latitude and longitude
 *     tags: [Others]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LatLngInput'
 *     responses:
 *       200:
 *         description: Successfully retrieved nearby zipcodes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZipCodesResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
getByZipCodeRouter.post(
    '/',
    zodValidate(schema),
    asyncHandler(async (req: Request, res: Response) => {
        const { lat, lng } = req.validatedData;
        const zipcodes = (await findNearByZipcodesByLatLong(lat, lng)) || [];
        res.status(200).json({ zipcodes });
    })
);

export { getZipCodeRouter, getByZipCodeRouter };
