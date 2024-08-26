import { ApiError } from '../../utils/apiError.js';
import { formatDateAndTime } from '../../utils/lib.js';
import logger from '../../utils/logger.js';
export const getVehicleSpecificDates = async (req, res) => {
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
            const sendingStartDate = formatDateAndTime(startDate, zipCode);
            const sendingEndDate = formatDateAndTime(endDate, zipCode);
            // Inverting the time zone offset to get receiving dates
            const receivingStartDate = formatDateAndTime(startDate, zipCode);
            const receivingEndDate = formatDateAndTime(endDate, zipCode);
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
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};
