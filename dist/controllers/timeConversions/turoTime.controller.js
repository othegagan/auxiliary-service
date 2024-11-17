import { ApiError } from '@/utils/apiError';
import { ApiResponse } from '@/utils/apiResponse';
import { convertToTimeZoneISO, findTimeZoneByZipcode } from '@/utils/lib';
import logger from '@/utils/logger';
import { parseZonedDateTime } from '@internationalized/date';
import { format, parse } from 'date-fns';
export const turoTimeConversionController = async (req, res) => {
    const { turoStartTime, turoEndTime, zipCode, startTS, endTS } = req.validatedData;
    try {
        let response = {};
        if (startTS && endTS) {
            const start = splitDateTime(startTS);
            const end = splitDateTime(endTS);
            response = {
                zipCode: zipCode,
                startTs: convertToTimeZoneISO(`${start.date}T${start.time}`, zipCode),
                endTS: convertToTimeZoneISO(`${end.date}T${end.time}`, zipCode)
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
        res.status(200).send(new ApiResponse(200, response, 'Successfully converted to vehicle specified time zone'));
    }
    catch (error) {
        logger.error(error.message);
        res.status(200).send(new ApiError(500, `Failed to convert the dates: ${error.message}`));
    }
};
function convertToTuroDate(dateString, zipCode) {
    const dateStringWithoutTimeZone = dateString.replace(/ [A-Z]{3} /, ' ');
    const parsedDate = parse(dateStringWithoutTimeZone, 'EEE MMM dd HH:mm:ss yyyy', new Date());
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    const formattedTime = parsedDate.toTimeString().slice(0, 8);
    const timeZone = findTimeZoneByZipcode(zipCode);
    const combinedDateTimeString = `${formattedDate}T${formattedTime}`;
    const convertedCarDate = parseZonedDateTime(`${combinedDateTimeString}[${timeZone}]`).toAbsoluteString();
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