"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleSpecificDates = void 0;
const apiError_1 = require("../../utils/apiError.js");
const lib_1 = require("../../utils/lib.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const getVehicleSpecificDates = async (req, res) => {
    const { localDateAndStartTimeArr, localDateAndEndTimeArr, zipCodeArr, localTimeZoneOffsetInMinutes } = req.validatedData;
    try {
        const sendingStartDateArr = [];
        const sendingEndDateArr = [];
        const receivingStartDateArr = [];
        const receivingEndDateArr = [];
        for (let i = 0; i < zipCodeArr.length; i++) {
            const zipCode = zipCodeArr[i];
            const startDate = localDateAndStartTimeArr[i];
            const endDate = localDateAndEndTimeArr[i];
            // Adjust and format the dates using the provided formatDateAndTime function
            const sendingStartDate = (0, lib_1.formatDateAndTime)(startDate, zipCode);
            const sendingEndDate = (0, lib_1.formatDateAndTime)(endDate, zipCode);
            // Inverting the time zone offset to get receiving dates
            const receivingStartDate = (0, lib_1.formatDateAndTime)(startDate, zipCode);
            const receivingEndDate = (0, lib_1.formatDateAndTime)(endDate, zipCode);
            sendingStartDateArr.push(sendingStartDate);
            sendingEndDateArr.push(sendingEndDate);
            receivingStartDateArr.push(receivingStartDate);
            receivingEndDateArr.push(receivingEndDate);
        }
        // Send the result
        res.status(200).send({
            sendingStartDateArr,
            sendingEndDateArr,
            receivingStartDateArr,
            receivingEndDateArr
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(500).json(new apiError_1.ApiError(500, error.message, error));
    }
};
exports.getVehicleSpecificDates = getVehicleSpecificDates;
//# sourceMappingURL=getVehicleSpecificDates.controller.js.map