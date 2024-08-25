import { env } from '@/configs/env';
import { ApiError } from '@/utils/apiError';
import logger from '@/utils/logger';
import axios from 'axios';
import { Request, Response } from 'express';

export const createTuroTripOnBundee = async (req: Request, res: Response) => {
    const { dates, turoTripId, turoId } = req.validatedData;

    try {
        const url = `${env.BUNDEE_HOST_VEHICLE_BASE_URL}/v1/vehicle/getVehicleConstraintByVehicleId`;
        const payload = {
            fromValue: 'turovehicle',
            constraintName: turoId
        };
        const headers = {
            'Content-Type': 'application/json',
            Bundee_auth_token: env.BUNDEE_AUTH_TOKEN
        };

        axios
            .post(url, payload, { headers: headers })
            .then((response) => {
                const tripsToBeCreated = {};
                tripsToBeCreated[`T_${turoTripId}`] = {
                    vehicleId: response.data.vehicleBusinessConstraints[0].vehicleId,
                    turoId: turoId,
                    dates: dates
                };
                res.status(200).send({ trip: tripsToBeCreated[`T_${turoTripId}`] });
            })
            .catch((error) => {
                logger.error(error.message);
                res.status(401).send({
                    error: `Vehicle mapped to turoid ${turoId} not found in Bundee DB`
                });
            });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};
