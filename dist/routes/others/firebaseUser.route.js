import { createUserInFirebase, getUserByEmailInFirebase, updateUserInFirebase, verifyUserTokenInFirebase } from '../../controllers/others/firebaseUser.controller.js';
import { zodValidate } from '../../utils/zodValidate.js';
import express from 'express';
import { z } from 'zod';
const userSchemas = {
    create: z.object({
        email: z.string().email({ message: 'Invalid email' }),
        emailVerified: z.boolean(),
        phoneNumber: z.string(),
        password: z.string({ message: 'Password is required' }),
        displayName: z.string(),
        photoURL: z.string(),
        disabled: z.boolean()
    }),
    update: z.object({
        uid: z.string().uuid({ message: 'Invalid uid' }),
        email: z.string().email({ message: 'Invalid email' }),
        emailVerified: z.boolean(),
        phoneNumber: z.string(),
        password: z.string({ message: 'Password is required' }),
        displayName: z.string(),
        photoURL: z.string(),
        disabled: z.boolean()
    }),
    getByEmail: z.object({
        email: z.string().email({ message: 'Invalid email' })
    }),
    verifyToken: z.object({
        token: z.string().uuid({ message: 'Invalid token' })
    })
};
const createUserRouter = express.Router();
const updateUserRouter = express.Router();
const getUserByEmailRouter = express.Router();
const verfiyUserTokenRouter = express.Router();
createUserRouter.post('/', zodValidate(userSchemas.create), createUserInFirebase);
updateUserRouter.post('/', zodValidate(userSchemas.update), updateUserInFirebase);
getUserByEmailRouter.post('/', zodValidate(userSchemas.getByEmail), getUserByEmailInFirebase);
verfiyUserTokenRouter.post('/', zodValidate(userSchemas.verifyToken), verifyUserTokenInFirebase);
export { createUserRouter, updateUserRouter, getUserByEmailRouter, verfiyUserTokenRouter };
