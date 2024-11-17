import twilio from 'twilio';
const { AccessToken } = twilio.jwt;
import { env } from './env';

const twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

const ChatGrant = AccessToken.ChatGrant;

export { ChatGrant, twilioClient };
