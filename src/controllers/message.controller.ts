import { env } from '@/configs/env';
import admin from '@/configs/firebase';
import { twilioClient } from '@/configs/twilio';
import { ApiError } from '@/utils/apiError';
import logger from '@/utils/logger';
import axios from 'axios';
import { Request, Response } from 'express';

const envPrefix = process.env.ENV_PREFIX || 'dev';

export const systemSendMessage = (req: Request, res: Response) => sendMessage(req, res);
export const hostSendMessage = (req: Request, res: Response) => sendMessage(req, res, 'HOST');
export const clientSendMessage = (req: Request, res: Response) => sendMessage(req, res, 'CLIENT');

const sendMessage = async (req: Request, res: Response, identity?: string) => {
    const { tripId, message } = req.validatedData;

    try {
        const db = admin.firestore();
        const assetDoc = await db.collection(`${envPrefix}_id_${tripId}`).doc(`${envPrefix}_id_${tripId}`).get();

        const serviceSid = assetDoc.get('serviceId');
        const channelSid = assetDoc.get('channelId');

        const messageOptions: any = { body: message };
        if (identity) messageOptions.author = identity;

        const twilloMessage = await twilioClient.conversations.v1.services(serviceSid).conversations(channelSid).messages.create(messageOptions);

        await sendPushNotification(message, tripId, identity === 'HOST' ? 'client' : identity === 'CLIENT' ? 'host' : 'both');
        res.status(200).json({ messageId: twilloMessage.sid });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};

export const sendPushNotification = async (message: string, tripId: number, receiverType: 'host' | 'client' | 'both') => {
    const url = `${env.BUNDEE_BOOKING_SERVICE_BASE_URL}/v1/booking/pushNotification`;

    const payload = { tripId, receiverType, message };
    const config = { headers: { Bundee_auth_token: env.BUNDEE_AUTH_TOKEN } };

    return axios.post(url, payload, config);
};
