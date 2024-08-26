"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = vehicleFeautersById;
const env_1 = require("../../configs/env.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const axios_1 = __importDefault(require("axios"));
async function vehicleFeautersById(vehicleId) {
    const url = `${env_1.env.BUNDEE_AVAILABILITY_SERVICE_BASE_URL}/v1/availability/getVehiclesnFeaturesById`;
    const payload = {
        vehicleid: vehicleId
    };
    const headers = {
        'Content-Type': 'application/json',
        Bundee_auth_token: env_1.env.BUNDEE_AUTH_TOKEN
    };
    try {
        const response = await axios_1.default.post(url, payload, { headers: headers });
        logger_1.default.info(response.data);
        if (response.data.errorCode === '0') {
            const vehicleFeatures = response.data.vehicleAllDetails[0];
            return vehicleFeatures;
        }
        return null;
    }
    catch (error) {
        logger_1.default.error(error);
    }
}
//# sourceMappingURL=vehicleFeautersById.controller.js.map