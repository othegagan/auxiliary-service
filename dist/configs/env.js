import { config } from 'dotenv';
import { z } from 'zod';
// Load environment variables based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
config({ path: envFile });
const envSchema = z.object({
    PORT: z.coerce.number().min(1, 'PORT must be a valid number'),
    NODE_ENV: z.union([z.literal('development'), z.literal('qa'), z.literal('production')]),
    PASSWORD: z.string().min(1, 'PASSWORD is required'),
    // Firebase configuration
    FIREBASE_PROJECT_ID: z.string().min(1, 'FIREBASE_PROJECT_ID is required'),
    FIREBASE_CLIENT_EMAIL: z.string().email('FIREBASE_CLIENT_EMAIL must be a valid email'),
    FIREBASE_PRIVATE_KEY: z.string().min(1, 'FIREBASE_PRIVATE_KEY is required'),
    FIREBASE_CLIENT_ID: z.string().min(1, 'FIREBASE_CLIENT_ID is required'),
    FIREBASE_CLIENT_X509_CERT_URL: z.string().url('FIREBASE_CLIENT_X509_CERT_URL must be a valid URL'),
    FIREBASE_PRIVATE_KEY_ID: z.string().min(1, 'FIREBASE_PRIVATE_KEY_ID is required'),
    // Twilio configuration
    TWILIO_ACCOUNT_SID: z.string().min(1, 'TWILIO_ACCOUNT_SID is required'),
    TWILIO_AUTH_TOKEN: z.string().min(1, 'TWILIO_AUTH_TOKEN is required'),
    TWILIO_API_SECRET: z.string().min(1, 'TWILIO_API_SECRET is required'),
    TWILIO_API_KEY: z.string().min(1, 'TWILIO_API_KEY is required'),
    // Bunbee configuration
    ENV_PREFIX: z.string().min(1, 'ENV_PREFIX is required'),
    BUNDEE_AUTH_TOKEN: z.string().min(1, 'BUNDEE_AUTH_TOKEN is required'),
    BUNDEE_BOOKING_SERVICE_BASE_URL: z.string().url('BUNDEE_BOOKING_SERVICE_BASE_URL must be a valid URL'),
    BUNDEE_HOST_VEHICLE_BASE_URL: z.string().url('BUNDEE_HOST_VEHICLE_BASE_URL must be a valid URL'),
    BUNDEE_AVAILABILITY_SERVICE_BASE_URL: z.string().url('BUNDEE_AVAILABILITY_SERVICE_BASE_URL must be a valid URL'),
    BUNDEE_USER_MANAGEMENT_BASE_URL: z.string().url('BUNDEE_USER_MANAGEMENT_BASE_URL must be a valid URL'),
    // MeasureOne configuration
    MEASUREONE_BASE_URL: z.string().url('MEASUREONE_BASE_URL must be a valid URL'),
    MEASUREONE_CLIENT_ID: z.string().min(1, 'MEASUREONE_CLIENT_ID is required'),
    MEASUREONE_SECRET: z.string().min(1, 'MEASUREONE_SECRET is required'),
    MEASUREONE_API_VERSION: z.string().min(1, 'MEASUREONE_API_VERSION is required'),
    WEBHOOK_URL: z.string().url('WEBHOOK_URL must be a valid URL'),
    // Stripe configuration
    STRIPE_BASE_URL: z.string().url('STRIPE_BASE_URL must be a valid URL'),
    STRIPE_SECRET_KEY: z.string().min(1, 'STRIPE_SECRET_KEY is required'),
    STRIPE_PUBLISHABLE_KEY: z.string().min(1, 'STRIPE_PUBLISHABLE_KEY is required')
});
// Use "env!" to indicate that `env` will be initialized
let env;
try {
    env = envSchema.parse(process.env);
}
catch (error) {
    if (error instanceof z.ZodError) {
        console.error('Environment validation error:', error.errors);
        process.exit(1); // Exit the process if env validation fails
    }
}
export { env };
//# sourceMappingURL=env.js.map