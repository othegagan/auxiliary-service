"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getVehicleSpecificDates_controller_1 = require("../../controllers/others/getVehicleSpecificDates.controller.js");
const passwordAuth_middleware_1 = require("../../middlewares/passwordAuth.middleware.js");
const zodValidate_1 = require("../../utils/zodValidate.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const schema = zod_1.z.object({
    localDateAndStartTimeArr: zod_1.z.array(zod_1.z.string()),
    localDateAndEndTimeArr: zod_1.z.array(zod_1.z.string()),
    zipCodeArr: zod_1.z.array(zod_1.z.string()),
    localTimeZoneOffsetInMinutes: zod_1.z.number().optional()
});
const getVehicleSpecificDatesRouter = express_1.default.Router();
getVehicleSpecificDatesRouter.post('/', passwordAuth_middleware_1.passwordAuth, (0, zodValidate_1.zodValidate)(schema), getVehicleSpecificDates_controller_1.getVehicleSpecificDates);
exports.default = getVehicleSpecificDatesRouter;
//# sourceMappingURL=getVehicleSpecificDates.route.js.map