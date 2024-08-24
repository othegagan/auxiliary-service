import { ApiError } from "@/utils/apiError";
import logger from "@/utils/logger";
import { Request, Response } from "express";

export const getVehicleSpecificDates = async (req: Request, res: Response) => {
    
    const { localDateAndStartTimeArr, localDateAndEndTimeArr, zipCodeArr, localTimeZoneOffsetInMinutes } = req.validatedData;

    try {
        res.status(200).json({});
    } catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};
