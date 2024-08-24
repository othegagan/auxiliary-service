import twilio from 'twilio';
import AccessToken from 'twilio/lib/jwt/AccessToken';
import { env } from './env';

const twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

const ChatGrant = AccessToken.ChatGrant;

export { ChatGrant, twilioClient };
