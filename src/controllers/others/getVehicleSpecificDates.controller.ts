import { ApiError } from '@/utils/apiError';
import { formatDateAndTime } from '@/utils/lib';
import logger from '@/utils/logger';
import { Request, Response } from 'express';

export const getVehicleSpecificDates = async (req: Request, res: Response) => {
    const { localDateAndStartTimeArr, localDateAndEndTimeArr, zipCodeArr, localTimeZoneOffsetInMinutes } = req.validatedData;

    try {
        const sendingStartDateArr: string[] = [];
        const sendingEndDateArr: string[] = [];
        const receivingStartDateArr: string[] = [];
        const receivingEndDateArr: string[] = [];

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
    } catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};
