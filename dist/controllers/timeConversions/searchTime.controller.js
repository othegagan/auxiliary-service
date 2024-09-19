"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTimeConversionController = void 0;
const apiError_1 = require("../../utils/apiError.js");
const apiResponse_1 = require("../../utils/apiResponse.js");
const lib_1 = require("../../utils/lib.js");
const logger_1 = __importDefault(require("../../utils/logger.js"));
const date_1 = require("@internationalized/date");
const tz_lookup_1 = __importDefault(require("tz-lookup"));
const searchTimeConversionController = async (req, res) => {
    const { latitude, longitude, startDate, startTime, endDate, endTime, zipCode } = req.validatedData;
    try {
        let zoneStartDateTime = '';
        let zoneEndDateTime = '';
        if (zipCode === '') {
            // If zipCode is not provided, convert based on lat and long
            zoneStartDateTime = getSearchDates(Number(longitude), Number(latitude), startDate, startTime);
            zoneEndDateTime = getSearchDates(Number(longitude), Number(latitude), endDate, endTime);
        }
        else {
            // convert based on zipCode
            zoneStartDateTime = (0, lib_1.convertToTimeZoneISO)(`${startDate}T${startTime}`, zipCode);
            zoneEndDateTime = (0, lib_1.convertToTimeZoneISO)(`${endDate}T${endTime}`, zipCode);
        }
        const response = {
            lat: longitude || '',
            lng: latitude || '',
            zipCode: zipCode || '',
            startTs: zoneStartDateTime,
            endTS: zoneEndDateTime,
            pickupTime: startTime,
            dropTime: endTime
        };
        res.status(200).send(new apiResponse_1.ApiResponse(200, response, '"Successfully converted to vehicle specified time zone'));
    }
    catch (error) {
        logger_1.default.error(error.message);
        res.status(200).send(new apiError_1.ApiError(500, `Failed to convert the dates: ${error.message}`));
    }
};
exports.searchTimeConversionController = searchTimeConversionController;
function getSearchDates(lat, lon, date, time) {
    const timezone = (0, tz_lookup_1.default)(lat, lon);
    if (timezone) {
        const dateString = `${date}T${time}`;
        const converedCarDate = (0, date_1.parseZonedDateTime)(`${dateString}[${timezone}]`).toAbsoluteString();
        return converedCarDate;
    }
    logger_1.default.error('Timezone not found for provided coordinates.');
    return null;
}
//# sourceMappingURL=searchTime.controller.js.map