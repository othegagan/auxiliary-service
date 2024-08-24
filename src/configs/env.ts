import { z } from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number(),
    NODE_ENV: z.union([z.literal('development'), z.literal('qa'), z.literal('production')]),
    PASSWORD: z.string(),

    // Firebase configuration
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_CLIENT_EMAIL: z.string(),
    FIREBASE_PRIVATE_KEY: z.string(),
    FIREBASE_CLIENT_ID: z.string(),
    FIREBASE_CLIENT_X509_CERT_URL: z.string(),
    FIREBASE_PRIVATE_KEY_ID: z.string(),

    // Twilio configuration
    TWILIO_ACCOUNT_SID: z.string(),
    TWILIO_AUTH_TOKEN: z.string(),
    TWILIO_API_SECRET: z.string(),
    TWILIO_API_KEY: z.string(),

    // Bunbee configuration
    ENV_PREFIX: z.string(),
    BUNDEE_AUTH_TOKEN: z.string(),
    BUNDEE_BOOKING_SERVICE_BASE_URL: z.string(),
    BUNDEE_HOST_VEHICLE_BASE_URL: z.string(),
    BUNDEE_AVAILABILITY_SERVICE_BASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
