import { emailTimeConversionController } from '@/controllers/timeConversions/EmailTime.controller';
import { searchTimeConversionController } from '@/controllers/timeConversions/searchTime.controller';
import { turoTimeConversionController } from '@/controllers/timeConversions/turoTime.controller';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';

const timeConversionRouter = express.Router();

const turoTimeConversionSchema = z.object({
    turoStartTime: z.string({ required_error: 'Turo start time is required' }).optional(),
    turoEndTime: z.string({ required_error: 'Turo end time is required' }).optional(),
    zipCode: z.string({ required_error: 'Zipcode is required' }),
    startTS: z.string({ invalid_type_error: 'startTS is required' }).optional(),
    endTS: z.string({ invalid_type_error: 'EndTS is required' }).optional()
});

timeConversionRouter.post('/turoTimeConversion', zodValidate(turoTimeConversionSchema), turoTimeConversionController);

const emailTimeConversionSchema = z.object({
    zipCode: z.string({ required_error: 'Zipcode is required' }),
    tripST: z.string({ required_error: 'tripST time is required' }),
    tripET: z.string({ required_error: 'tripET time is required' })
});

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

timeConversionRouter.post('/searchTimeConversion', zodValidate(searchTimeConversionSchema), searchTimeConversionController);

export default timeConversionRouter;
