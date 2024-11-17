import { getVehicleSpecificDatesController } from '@/controllers/others/getVehicleSpecificDates.controller';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';

const schema = z.object({
    localDateAndStartTimeArr: z.array(z.string()),
    localDateAndEndTimeArr: z.array(z.string()),
    zipCodeArr: z.array(z.string())
    // localTimeZoneOffsetInMinutes: z.number().optional()
});

const getVehicleSpecificDatesRouter = express.Router();

getVehicleSpecificDatesRouter.post('/', zodValidate(schema), getVehicleSpecificDatesController);

export default getVehicleSpecificDatesRouter;
