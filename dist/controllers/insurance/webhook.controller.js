"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = void 0;
const apiError_1 = require("../../utils/apiError.js");
const apiResponse_1 = require("../../utils/apiResponse.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const webhook = async (req, res) => {
    const body = req.body;
    try {
        const response = { ...body };
        res.status(200).json(new apiResponse_1.ApiResponse(200, response, 'Webhook event received successfully'));
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(500).json(new apiError_1.ApiError(500, error.message, error));
    }
};
exports.webhook = webhook;
//# sourceMappingURL=webhook.controller.js.map