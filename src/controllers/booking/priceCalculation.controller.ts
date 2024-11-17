import { env } from '@/configs/env';
import { convertToTimeZoneISO } from '@/utils/lib';
import logger from '@/utils/logger';
import axios from 'axios';
import { Request, Response } from 'express';

export async function priceCalculationController(req: Request, res: Response) {
    const { vehicleid, startTime, endTime, airportDelivery, customDelivery, hostid, tripid, zipCode } = req.body;

    const convertedStartDate = convertToTimeZoneISO(startTime, zipCode);
    const convertedEndDate = convertToTimeZoneISO(endTime, zipCode);

    const payload = {
        vehicleid,
        startTime: convertedStartDate,
        endTime: convertedEndDate,
        airportDelivery,
        customDelivery,
        hostid,
        tripid
    };

    try {
        const priceResponse = await getPriceResponse(payload);
        res.status(200).json(priceResponse);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getPriceResponse(payload: any) {
    const url = `${env.BUNDEE_HOST_VEHICLE_BASE_URL}/v1/vehicle/calculatePrice`;

    const headers = {
        'Content-Type': 'application/json',
        Bundee_auth_token: env.BUNDEE_AUTH_TOKEN
    };

    try {
        const response = await axios.post(url, payload, { headers: headers });
        return response.data;
    } catch (error) {
        logger.error(error);
    }
}
