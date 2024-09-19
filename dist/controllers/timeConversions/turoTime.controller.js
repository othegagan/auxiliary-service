"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turoTimeConversionController = void 0;
const apiError_1 = require("../../utils/apiError.js");
const apiResponse_1 = require("../../utils/apiResponse.js");
const lib_1 = require("../../utils/lib.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const date_1 = require("@internationalized/date");
const date_fns_1 = require("date-fns");
const turoTimeConversionController = async (req, res) => {
    const { turoStartTime, turoEndTime, zipCode, startTS, endTS } = req.validatedData;
    try {
        let response = {};
        if (startTS && endTS) {
            const start = splitDateTime(startTS);
            const end = splitDateTime(endTS);
            response = {
                zipCode: zipCode,
                startTs: (0, lib_1.convertToTimeZoneISO)(`${start.date}T${start.time}`, zipCode),
                endTS: (0, lib_1.convertToTimeZoneISO)(`${end.date}T${end.time}`, zipCode)
            };
        }
        else {
            const turoST = convertToTuroDate(turoStartTime, zipCode);
            const turoET = convertToTuroDate(turoEndTime, zipCode);
            response = {
                zipCode: zipCode,
                turoST,
                turoET
            };
        }
        res.status(200).send(new apiResponse_1.ApiResponse(200, response, '"Successfully converted to vehicle specified time zone'));
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(200).send(new apiError_1.ApiError(500, `Failed to convert the dates: ${error.message}`));
    }
};
exports.turoTimeConversionController = turoTimeConversionController;
function convertToTuroDate(dateString, zipCode) {
    const dateStringWithoutTimeZone = dateString.replace(/ [A-Z]{3} /, ' ');
    const parsedDate = (0, date_fns_1.parse)(dateStringWithoutTimeZone, 'EEE MMM dd HH:mm:ss yyyy', new Date());
    const formattedDate = (0, date_fns_1.format)(parsedDate, 'yyyy-MM-dd');
    const formattedTime = parsedDate.toTimeString().slice(0, 8);
    const timeZone = (0, lib_1.findTimeZoneByZipcode)(zipCode);
    const combinedDateTimeString = `${formattedDate}T${formattedTime}`;
    const convertedCarDate = (0, date_1.parseZonedDateTime)(`${combinedDateTimeString}[${timeZone}]`).toAbsoluteString();
    // console.log(dateString, '==>', convertedCarDate);
    return convertedCarDate;
}
function splitDateTime(dateTimeString) {
    const [datePart, timePart] = dateTimeString.split('T');
    const date = datePart;
    const time = timePart.split('.')[0]; // Removing milliseconds
    return { date, time };
}
//# sourceMappingURL=turoTime.controller.js.map