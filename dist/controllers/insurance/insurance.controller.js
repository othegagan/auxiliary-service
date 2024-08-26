"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insurance = void 0;
const env_1 = require("../../configs/env.js");
const apiError_1 = require("../../utils/apiError.js");
const apiResponse_1 = require("../../utils/apiResponse.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const axios_1 = __importDefault(require("axios"));
const insurance = async (req, res) => {
    const { firstName, lastName, email, externalId, phoneNumber } = req.validatedData;
    try {
        const response = await createNewIndividual(firstName, lastName, email, externalId, phoneNumber);
        res.status(200).json(new apiResponse_1.ApiResponse(200, response, 'Individual created successfully'));
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(500).json(new apiError_1.ApiError(500, error.message, error));
    }
};
exports.insurance = insurance;
async function createNewIndividual(firstName, lastName, email, externalId, phoneNumber) {
    try {
        const url = `${env_1.env.MEASUREONE_BASE_URL}/v3/individuals/new`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env_1.env.MEASUREONE_BRARER_TOKEN}`,
                Accept: 'application/json',
                version: env_1.env.MEASUREONE_API_VERSION
            }
        };
        const payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            external_id: externalId,
            phone_number: phoneNumber
        };
        const response = await axios_1.default.post(url, payload, config);
        return response.data;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new apiError_1.ApiError(500, error.message, error);
    }
}
async function getDetailsOfIndividual(id) {
    try {
        const url = `${env_1.env.MEASUREONE_BASE_URL}/v3/individuals/get_by_id`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env_1.env.MEASUREONE_BRARER_TOKEN}`,
                Accept: 'application/json',
                version: env_1.env.MEASUREONE_API_VERSION
            }
        };
        const payload = { id: id };
        const response = await axios_1.default.post(url, payload, config);
        return response.data;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new apiError_1.ApiError(500, error.message, error);
    }
}
//# sourceMappingURL=insurance.controller.js.map