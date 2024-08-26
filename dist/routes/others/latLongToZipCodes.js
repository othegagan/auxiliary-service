import { asyncHandler } from '../../utils/asyncHandler.js';
import { findNearByZipcodesByLatLong, findZipcodeOfLatLong } from '../../utils/lib.js';
import { zodValidate } from '../../utils/zodValidate.js';
import express from 'express';
import { z } from 'zod';
const schema = z.object({
    lat: z.string({ required_error: 'lat is required' }),
    lng: z.string({ required_error: 'lng is required' })
});
const getZipCodeRouter = express.Router();
const getByZipCodeRouter = express.Router();
getZipCodeRouter.post('/', zodValidate(schema), asyncHandler(async (req, res) => {
    const { lat, lng } = req.validatedData;
    const result = await findZipcodeOfLatLong(lat, lng);
    res.status(200).json({ zipcode: result });
}));
getByZipCodeRouter.post('/', zodValidate(schema), asyncHandler(async (req, res) => {
    const { lat, lng } = req.validatedData;
    const zipcodes = (await findNearByZipcodesByLatLong(lat, lng)) || [];
    res.status(200).json({ zipcodes });
}));
export { getZipCodeRouter, getByZipCodeRouter };
