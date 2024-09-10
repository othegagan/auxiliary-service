"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const insurance_controller_1 = require("../../controllers/insurance/insurance.controller.js");
const zodValidate_1 = require("../../utils/zodValidate.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const insuranceRouter = express_1.default.Router();
const schema = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: 'First name is required' }),
    lastName: zod_1.z.string({ required_error: 'Last name is required' }),
    email: zod_1.z.string().email(),
    externalId: zod_1.z.string().optional(),
    phoneNumber: zod_1.z.string({ invalid_type_error: 'Invalid phone number' }).optional()
});
insuranceRouter.post('/', (0, zodValidate_1.zodValidate)(schema), insurance_controller_1.createNewIndividual);
exports.default = insuranceRouter;
//# sourceMappingURL=insurance.route.js.map