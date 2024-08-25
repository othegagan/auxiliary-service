import { env } from '@/configs/env';
import { ChatGrant } from '@/configs/twilio';
import { ApiError } from '@/utils/apiError';
import logger from '@/utils/logger';
import { Request, Response } from 'express';
import AccessToken from 'twilio/lib/jwt/AccessToken';

export const getClientAccessToken = async (req: Request, res: Response) => {
    const accountSid = env.TWILIO_ACCOUNT_SID;
    const twilioApiKey = env.TWILIO_API_KEY;
    const twilioApiSecret = env.TWILIO_API_SECRET;

    const { serviceId } = req.validatedData;

    try {
        const identity = 'CLIENT';
        const chatGrant = new ChatGrant({
            serviceSid: serviceId
        });

        const token = new AccessToken(accountSid, twilioApiKey, twilioApiSecret, { identity: identity });
        token.addGrant(chatGrant);

        res.status(200).json({ hostAccessToken: token.toJwt() });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};
