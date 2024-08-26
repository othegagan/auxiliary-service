import { copyTuroVehicleData, copyTuroVehicleDataServerless } from '../../controllers/turo/copyTuroVehicleData.controller.js';
import { passwordAuth } from '../../middlewares/passwordAuth.middleware.js';
import { zodValidate } from '../../utils/zodValidate.js';
import express from 'express';
import { z } from 'zod';
const schema = z.object({
    turolink: z.string({ required_error: 'Turo link is required', invalid_type_error: 'Turo link must be a string' }).trim()
});
const copyTuroVehicleDataRouter = express.Router();
copyTuroVehicleDataRouter.post('/', passwordAuth, zodValidate(schema), copyTuroVehicleData);
const copyTuroVehicleDataServerlessRouter = express.Router();
copyTuroVehicleDataServerlessRouter.post('/', passwordAuth, zodValidate(schema), copyTuroVehicleDataServerless);
export { copyTuroVehicleDataRouter, copyTuroVehicleDataServerlessRouter };
