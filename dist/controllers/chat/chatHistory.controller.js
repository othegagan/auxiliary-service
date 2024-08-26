import admin from '../../configs/firebase.js';
import { twilioClient } from '../../configs/twilio.js';
import { ApiError } from '../../utils/apiError.js';
import logger from '../../utils/logger.js';
const envPrefix = process.env.ENV_PREFIX || 'dev';
export const chatHistory = async (req, res) => {
    const { tripId, count } = req.validatedData;
    try {
        const db = admin.firestore();
        const id = `${envPrefix}_id_${tripId}`;
        const assetDoc = await db.collection(id).doc(id).get();
        if (assetDoc.exists) {
            const assets = assetDoc.data();
            const serviceSid = assets.serviceId;
            const channelSid = assets.channelId;
            twilioClient.conversations.v1
                .services(serviceSid)
                .conversations(channelSid)
                .messages.list({ limit: count, order: 'desc' })
                .then((messages) => {
                res.status(200).json({ messages });
            });
        }
        else {
            res.status(404).json(new ApiError(404, 'No such document!'));
        }
    }
    catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message));
    }
};
