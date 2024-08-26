import { ApiError } from '../utils/apiError.js';
import logger from '../utils/logger.js';
export const getVehicleSpecificDates = async (req, res) => {
    const { localDateAndStartTimeArr, localDateAndEndTimeArr, zipCodeArr, localTimeZoneOffsetInMinutes } = req.validatedData;
    try {
        res.status(200).json({});
    }
    catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};
