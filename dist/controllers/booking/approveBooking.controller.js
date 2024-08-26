"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = approveBooking;
const env_1 = require("../../configs/env.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const axios_1 = __importDefault(require("axios"));
const logUpdate_controller_1 = __importDefault(require("../others/logUpdate.controller.js"));
async function approveBooking(tripId) {
    const url = `${env_1.env.BUNDEE_BOOKING_SERVICE_BASE_URL}/v1/booking/updateReservationApproval`;
    const payload = {
        tripid: tripId,
        comments: ''
    };
    const headers = {
        'Content-Type': 'application/json',
        Bundee_auth_token: env_1.env.BUNDEE_AUTH_TOKEN
    };
    try {
        const response = await axios_1.default.post(url, payload, { headers: headers });
        logger_1.default.info(response.data);
        if (response.data.errorCode === '0') {
            await (0, logUpdate_controller_1.default)(response.data.errorMessage);
        }
        else {
            await (0, logUpdate_controller_1.default)(response.data.errorMessage);
        }
    }
    catch (error) {
        logger_1.default.error(error);
    }
}
//# sourceMappingURL=approveBooking.controller.js.map