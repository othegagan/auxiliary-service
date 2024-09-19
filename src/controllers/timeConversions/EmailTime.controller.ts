import { ApiError } from '@/utils/apiError';
import { ApiResponse } from '@/utils/apiResponse';
import { formatDateAndTime } from '@/utils/lib';
import logger from '@/utils/logger';
import { Request, Response } from 'express';

export const emailTimeConversionController = async (req: Request, res: Response) => {
    const { tripST, tripET, zipCode } = req.validatedData;

    try {
        const startDateTime = formatDateAndTime(tripST, zipCode);
        const endDateTime = formatDateAndTime(tripET, zipCode);

        const response = {
            zipCode,
            startTs: startDateTime,
            endTS: endDateTime
        };

        res.status(200).send(new ApiResponse(200, response, 'Successfully converted to vehicle specified time zone'));
    } catch (error) {
        logger.error(error.message);
        res.status(200).send(new ApiError(500, `Failed to convert the dates: ${error.message}`));
    }
};
