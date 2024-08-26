"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logUpdate;
const env_1 = require("../../configs/env.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const axios_1 = __importDefault(require("axios"));
async function logUpdate(msg) {
    const url = `${env_1.env.BUNDEE_BOOKING_SERVICE_BASE_URL}/v1/booking/insertErrorLog`;
    const payload = {
        logLevel: 'info',
        moduleName: 'Duoblebooking handler',
        apiName: 'automated trip sync between Turo and bundee',
        logMessage: msg
    };
    const headers = {
        'Content-Type': 'application/json',
        Bundee_auth_token: env_1.env.BUNDEE_AUTH_TOKEN
    };
    try {
        const response = await axios_1.default.post(url, payload, { headers: headers });
        logger_1.default.info(response.data);
    }
    catch (error) {
        logger_1.default.error(error);
    }
}
//# sourceMappingURL=logUpdate.controller.js.map