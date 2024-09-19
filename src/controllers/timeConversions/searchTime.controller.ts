import { ApiError } from '@/utils/apiError';
import { ApiResponse } from '@/utils/apiResponse';
import { convertToTimeZoneISO } from '@/utils/lib';
import logger from '@/utils/logger';
import { parseZonedDateTime } from '@internationalized/date';
import { Request, Response } from 'express';
import tz_lookup from 'tz-lookup';

export const searchTimeConversionController = async (req: Request, res: Response) => {
    const { latitude, longitude, startDate, startTime, endDate, endTime, zipCode } = req.validatedData;

    try {
        let zoneStartDateTime = '';
        let zoneEndDateTime = '';

        if (zipCode === '') {
            // If zipCode is not provided, convert based on lat and long
            zoneStartDateTime = getSearchDates(Number(longitude), Number(latitude), startDate, startTime);
            zoneEndDateTime = getSearchDates(Number(longitude), Number(latitude), endDate, endTime);
        } else {
            // convert based on zipCode
            zoneStartDateTime = convertToTimeZoneISO(`${startDate}T${startTime}`, zipCode);
            zoneEndDateTime = convertToTimeZoneISO(`${endDate}T${endTime}`, zipCode);
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

        res.status(200).send(new ApiResponse(200, response, '"Successfully converted to vehicle specified time zone'));
    } catch (error) {
        logger.error(error.message);
        res.status(200).send(new ApiError(500, `Failed to convert the dates: ${error.message}`));
    }
};

function getSearchDates(lat: number, lon: number, date: string, time: string) {
    const timezone = tz_lookup(lat, lon);
    if (timezone) {
        const dateString = `${date}T${time}`;

        const converedCarDate = parseZonedDateTime(`${dateString}[${timezone}]`).toAbsoluteString();

        return converedCarDate;
    }
    logger.error('Timezone not found for provided coordinates.');
    return null;
}
