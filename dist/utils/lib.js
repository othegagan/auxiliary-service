"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToTimeZoneISO = convertToTimeZoneISO;
exports.formatDateAndTime = formatDateAndTime;
exports.findTimeZoneByZipcode = findTimeZoneByZipcode;
exports.findTimezoneOfLatLong = findTimezoneOfLatLong;
exports.findNearByZipcodesByLatLong = findNearByZipcodesByLatLong;
exports.findZipcodeOfLatLong = findZipcodeOfLatLong;
const date_1 = require("@internationalized/date");
const gps2zip_1 = __importDefault(require("gps2zip"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const tz_lookup_1 = __importDefault(require("tz-lookup"));
const zipcode_to_timezone_1 = __importDefault(require("zipcode-to-timezone"));
const zipcodes_nearby_1 = __importDefault(require("zipcodes-nearby"));
/**
 * Converts a given date, time, and zip code to a specific zipcode timezone ISO string.

 * @param datetime - The date in YYYY-MM-DDTHH:MM:SS format.
 * @param zipCode - The zip code to determine the timezone.
 * @returns The converted date and time in ISO format with the zipcode timezone.
 * @throws Will throw an error if the timezone cannot be determined from the zip code.
 */
function convertToTimeZoneISO(dateTime, zipCode) {
    const timeZone = findTimeZoneByZipcode(zipCode);
    const converedCarDate = (0, date_1.parseZonedDateTime)(`${dateTime}[${timeZone}]`).toAbsoluteString();
    return converedCarDate;
}
/**
 * Converts a given date from UTC to the specified time zone format.
 *
 * @param datetime - The date in YYYY-MM-DDTHH:MM:SS  format or UTC format.
 * @param zipCode - The zip code to determine the timezone.
 * @param format - Desired format of the converted date. ex: 'yyyy-MM-DD'. or 'YYYY-MM-DDTHH:mm:ss'
 * @returns The converted date and time in local zipcode time zone format.
 */
function formatDateAndTime(date, zipCode, format = 'ddd, MMM DD YYYY | h:mm A z') {
    if (!date || !zipCode)
        return '';
    const endTimeUTC = moment_timezone_1.default.utc(date);
    const timeZone = findTimeZoneByZipcode(zipCode);
    const timeInTimeZone = endTimeUTC.tz(timeZone);
    return timeInTimeZone.format(format || 'ddd, MMM DD YYYY | h:mm A z');
}
/**
 * Gives the timezone of a zip code.

 * @param zipCode - The zip code to determine the timezone.
 * @returns timezone of the zip code.
 * @returns null if the timezone cannot be determined from the zip code.
 */
function findTimeZoneByZipcode(zipCode) {
    const timeZone = zipcode_to_timezone_1.default.lookup(zipCode); // 73301, (Los angeles zip code : 90274) (MST : 85323)
    return timeZone || null;
}
/**
 * Gives the timezone of a lat long.
 *
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @returns timezone of the location.
 * @returns null if the timezone cannot be determined from the location.
 */
function findTimezoneOfLatLong(latitude, longitude) {
    if (!latitude || !longitude)
        return '';
    const timeZone = (0, tz_lookup_1.default)(latitude, longitude);
    return timeZone || null;
}
/**
 * Gives near by zip codes by latitude and longitude.
 *
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @returns near by zip codes.
 * @returns empty array if the zip codes cannot be determined from the location.
 */
function findNearByZipcodesByLatLong(latitude, longitude) {
    if (!latitude || !longitude)
        return [];
    const options = {
        longitude,
        latitude
    };
    const radius = 24000;
    const nearbyZipcodes = zipcodes_nearby_1.default.near(options, radius);
    return nearbyZipcodes || [];
}
/**
 * Gives the zip code of a lat long.
 *
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @returns zip code of a lat long.the location.
 * @returns null if the zip code cannot be determined from the location.
 */
function findZipcodeOfLatLong(latitude, longitude) {
    if (!latitude || !longitude)
        return '';
    const zipCode = gps2zip_1.default.gps2zip(latitude, longitude);
    return zipCode || null;
}
//# sourceMappingURL=lib.js.map