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
const timeConversionRouter = express_1.default.Router();
const turoTimeConversionSchema = zod_1.z.object({
    turoStartTime: zod_1.z.string({ required_error: 'Turo start time is required' }).optional(),
    turoEndTime: zod_1.z.string({ required_error: 'Turo end time is required' }).optional(),
    zipCode: zod_1.z.string({ required_error: 'Zipcode is required' }),
    startTS: zod_1.z.string({ invalid_type_error: 'startTS is required' }).optional(),
    endTS: zod_1.z.string({ invalid_type_error: 'EndTS is required' }).optional()
});
timeConversionRouter.post('/turoTimeConversion', (0, zodValidate_1.zodValidate)(turoTimeConversionSchema), turoTime_controller_1.turoTimeConversionController);
const emailTimeConversionSchema = zod_1.z.object({
    zipCode: zod_1.z.string({ required_error: 'Zipcode is required' }),
    tripST: zod_1.z.string({ required_error: 'tripST time is required' }),
    tripET: zod_1.z.string({ required_error: 'tripET time is required' })
});
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
timeConversionRouter.post('/searchTimeConversion', (0, zodValidate_1.zodValidate)(searchTimeConversionSchema), searchTime_controller_1.searchTimeConversionController);
exports.default = timeConversionRouter;
//# sourceMappingURL=timeConversion.route.js.map