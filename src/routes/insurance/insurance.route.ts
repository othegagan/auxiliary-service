import { createNewIndividual } from '@/controllers/insurance/insurance.controller';
import { zodValidate } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';

const insuranceRouter = express.Router();

const schema = z.object({
    firstName: z.string({ required_error: 'First name is required' }),
    lastName: z.string({ required_error: 'Last name is required' }),
    email: z.string().email(),
    externalId: z.string().optional(),
    phoneNumber: z.string({ invalid_type_error: 'Invalid phone number' }).optional()
});

insuranceRouter.post('/', zodValidate(schema), createNewIndividual);

export default insuranceRouter;
