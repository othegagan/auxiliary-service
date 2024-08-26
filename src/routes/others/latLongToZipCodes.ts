import { asyncHandler } from '@/utils/asyncHandler';
import { findNearByZipcodesByLatLong, findZipcodeOfLatLong } from '@/utils/lib';
import { zodValidate } from '@/utils/zodValidate';
import express, { Request, Response } from 'express';
import { z } from 'zod';

const schema = z.object({
    lat: z.string({ required_error: 'lat is required' }),
    lng: z.string({ required_error: 'lng is required' })
});

const getZipCodeRouter = express.Router();
const getByZipCodeRouter = express.Router();

getZipCodeRouter.post(
    '/',
    zodValidate(schema),
    asyncHandler(async (req: Request, res: Response) => {
        const { lat, lng } = req.validatedData;
        const result = await findZipcodeOfLatLong(lat, lng);
        res.status(200).json({ zipcode: result });
    })
);

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
