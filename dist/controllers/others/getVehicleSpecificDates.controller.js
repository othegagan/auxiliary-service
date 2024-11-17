import { ApiError } from '@/utils/apiError';
import { findTimeZoneByZipcode } from '@/utils/lib';
import logger from '@/utils/logger';
import moment from 'moment-timezone';
export const getVehicleSpecificDatesController = async (req, res) => {
    const { localDateAndStartTimeArr, localDateAndEndTimeArr, zipCodeArr, localTimeZoneOffsetInMinutes } = req.validatedData;
    try {
        const sendingStartDateArr = [];
        const sendingEndDateArr = [];
        const receivingStartDateArr = [];
        const receivingEndDateArr = [];
        //         // for (let i = 0; i < zipCodeArr.length; i++) {
        //         //     const zipCode = zipCodeArr[i];
        //         //     const startDate = localDateAndStartTimeArr[i];
        //         //     const endDate = localDateAndEndTimeArr[i];
        //         //     // Adjust and format the dates using the provided formatDateAndTime function
        //         //     const sendingStartDate = formatDateAndTime(startDate, zipCode);
        //         //     const sendingEndDate = formatDateAndTime(endDate, zipCode);
        //         //     // Inverting the time zone offset to get receiving dates
        //         //     const receivingStartDate = formatDateAndTime(startDate, zipCode);
        //         //     const receivingEndDate = formatDateAndTime(endDate, zipCode);
        //         //     sendingStartDateArr.push(sendingStartDate);
        //         //     sendingEndDateArr.push(sendingEndDate);
        //         //     receivingStartDateArr.push(receivingStartDate);
        //         //     receivingEndDateArr.push(receivingEndDate);
        //         // }
        //         function processDates(localDateArr: string[], sendingArr: string[], receivingArr: string[]) {
        //             for (let i = 0; i < zipCodeArr.length; i++) {
        //                 const timeZoneName = findTimeZoneByZipcode(zipCodeArr[i]);
        //                 const timeZoneOffset = ct.getTimezone(timeZoneName);
        //                 const formatter = new Intl.DateTimeFormat('en-US', { timeZone: timeZoneName, timeZoneName: 'short' });
        //                 const timeZoneInfo = formatter.formatToParts(new Date(localDateArr[i]));
        //                 const isDST = timeZoneInfo.some((part) => part.type === 'timeZoneName' && part.value.includes('CDT'));
        //                 // Determine offset
        //                 const offset = isDST ? timeZoneOffset.dstOffset : timeZoneOffset.utcOffset;
        //                 const localDate = new Date(localDateArr[i]);
        //                 // Adjusting the date for sending
        //                 const sendDate = new Date(localDate);
        //                 if (offset !== localTimeZoneOffsetInMinutes) {
        //                     sendDate.setMinutes(sendDate.getMinutes() - localTimeZoneOffsetInMinutes - offset);
        //                 }
        //                 sendingArr.push(sendDate.toISOString());
        //                 // Adjusting the date for receiving
        //                 const receiveDate = new Date(localDate);
        //                 if (offset !== localTimeZoneOffsetInMinutes) {
        //                     receiveDate.setMinutes(receiveDate.getMinutes() + localTimeZoneOffsetInMinutes + offset);
        //                 }
        //                 receivingArr.push(receiveDate.toISOString());
        //             }
        //         }
        //         processDates(localDateAndStartTimeArr, sendingStartDateArr, receivingStartDateArr);
        //         processDates(localDateAndEndTimeArr, sendingEndDateArr, receivingEndDateArr);
        // Send the result
        res.status(200).send({
            sendingStartDateArr,
            sendingEndDateArr,
            receivingStartDateArr,
            receivingEndDateArr
        });
    }
    catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};
function formatDateAndTime(date, zipCode, format = '') {
    if (!date || !zipCode)
        return '';
    const endTimeUTC = moment.utc(date);
    const timeZone = findTimeZoneByZipcode(zipCode);
    const timeInTimeZone = endTimeUTC.tz(timeZone);
    // if (format === '') return timeInTimeZone.toISOString();
    return timeInTimeZone.format('YYYY-MM-DD HH:mm');
}
//# sourceMappingURL=getVehicleSpecificDates.controller.js.map