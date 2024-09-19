"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTimeConversionController = void 0;
const apiError_1 = require("../../utils/apiError.js");
const apiResponse_1 = require("../../utils/apiResponse.js");
const lib_1 = require("../../utils/lib.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const emailTimeConversionController = async (req, res) => {
    const { tripST, tripET, zipCode } = req.validatedData;
    try {
        const startDateTime = (0, lib_1.formatDateAndTime)(tripST, zipCode);
        const endDateTime = (0, lib_1.formatDateAndTime)(tripET, zipCode);
        const response = {
            zipCode,
            startTs: startDateTime,
            endTS: endDateTime
        };
        res.status(200).send(new apiResponse_1.ApiResponse(200, response, 'Successfully converted to vehicle specified time zone'));
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(200).send(new apiError_1.ApiError(500, `Failed to convert the dates: ${error.message}`));
    }
};
exports.emailTimeConversionController = emailTimeConversionController;
//# sourceMappingURL=EmailTime.controller.js.map