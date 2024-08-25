import { env } from '@/configs/env';
import admin from '@/configs/firebase';
import { twilioClient } from '@/configs/twilio';
import { ApiError } from '@/utils/apiError';
import logger from '@/utils/logger';
const envPrefix = env.ENV_PREFIX || 'dev';
// Main function to create a conversation
export const createConversation = async (req, res) => {
    const { tripId } = req.validatedData;
    try {
        const service = await createService(tripId);
        const conversation = await createConversationService(service.sid, tripId);
        const host = await createParticipant(service.sid, conversation.sid, 'HOST');
        const clientParticipant = await createParticipant(service.sid, conversation.sid, 'CLIENT');
        await saveIdsToFB(tripId, service.sid, conversation.sid, host.sid, clientParticipant.sid);
        res.status(200).json({ service, conversation, host, clientParticipant });
    }
    catch (error) {
        logger.error(error.message);
        res.status(500).json(new ApiError(500, error.message, error));
    }
};
// Function to create a service
const createService = async (tripId) => {
    return await twilioClient.conversations.v1.services.create({
        friendlyName: `${envPrefix}_service_${tripId}`,
        //@ts-ignore
        uniqueName: `${envPrefix}_service_${tripId}`
    });
};
// Function to create a conversation in a service
const createConversationService = async (serviceSid, tripId) => {
    return await twilioClient.conversations.v1.services(serviceSid).conversations.create({
        friendlyName: `${envPrefix}_conversation_${tripId}`,
        uniqueName: `${envPrefix}_conversation_${tripId}`
    });
};
// Function to create a participant in a conversation
const createParticipant = async (serviceSid, conversationSid, role) => {
    return await twilioClient.conversations.v1
        .services(serviceSid)
        .conversations(conversationSid)
        .participants.create({
        attributes: JSON.stringify({ role }),
        identity: role
    });
};
// Function to save IDs to Firebase
const saveIdsToFB = async (tripId, serviceId, conversationId, hostId, clientId) => {
    const db = admin.firestore();
    const docRef = db.collection(`${envPrefix}_id_${tripId}`).doc(`${envPrefix}_id_${tripId}`);
    await docRef.set({
        serviceId,
        channelId: conversationId,
        hostId,
        clientId
    });
};
