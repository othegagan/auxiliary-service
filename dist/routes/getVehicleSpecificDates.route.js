import { getVehicleSpecificDates } from '@/controllers/getVehicleSpecificDates.controller';
import { passwordAuth } from '@/middlewares/passwordAuth.middleware';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';
const schema = z.object({
    localDateAndStartTimeArr: z.array(z.string()),
    localDateAndEndTimeArr: z.array(z.string()),
    zipCodeArr: z.array(z.string()),
    localTimeZoneOffsetInMinutes: z.number()
});
const getVehicleSpecificDatesRouter = express.Router();
getVehicleSpecificDatesRouter.post('/', passwordAuth, zodValidate(schema), getVehicleSpecificDates);
export default getVehicleSpecificDatesRouter;
