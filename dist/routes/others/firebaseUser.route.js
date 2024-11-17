import { checkPhoneNumberLinked, createUserInFirebase, getUserByEmailInFirebase, updateUserInFirebase, verifyUserTokenInFirebase } from '@/controllers/others/firebaseUser.controller';
import { zodValidate, zodValidateQuery } from '@/utils/zodValidate';
import express from 'express';
import { z } from 'zod';
const firebaseRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *         - email
 *         - emailVerified
 *         - phoneNumber
 *         - password
 *         - displayName
 *         - photoURL
 *         - disabled
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         emailVerified:
 *           type: boolean
 *         phoneNumber:
 *           type: string
 *         password:
 *           type: string
 *         displayName:
 *           type: string
 *         photoURL:
 *           type: string
 *         disabled:
 *           type: boolean
 *     UpdateUser:
 *       type: object
 *       required:
 *         - uid
 *         - email
 *         - emailVerified
 *         - phoneNumber
 *         - password
 *         - displayName
 *         - photoURL
 *         - disabled
 *       properties:
 *         uid:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *         emailVerified:
 *           type: boolean
 *         phoneNumber:
 *           type: string
 *         password:
 *           type: string
 *         displayName:
 *           type: string
 *         photoURL:
 *           type: string
 *         disabled:
 *           type: boolean
 *     GetUserByEmail:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *     VerifyUserToken:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           format: uuid
 */
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
        token: z.string({ required_error: 'Token is required' })
    }),
    checkPhoneLinkedToAnyUser: z.object({
        phoneNumber: z.string({ required_error: 'Phone Number is required' })
    })
};
/**
 * @swagger
 * /createUser:
 *   post:
 *     summary: Create a new user in Firebase
 *     tags: [Firebase User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
firebaseRouter.post('/createUser', zodValidate(userSchemas.create), createUserInFirebase);
/**
 * @swagger
 * /updateUser:
 *   post:
 *     summary: Update an existing user in Firebase
 *     tags: [Firebase User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
firebaseRouter.post('/updateUser', zodValidate(userSchemas.update), updateUserInFirebase);
/**
 * @swagger
 * /getUserByEmail:
 *   post:
 *     summary: Get user by email from Firebase
 *     tags: [Firebase User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetUserByEmail'
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
firebaseRouter.post('/getUserByEmail', zodValidate(userSchemas.getByEmail), getUserByEmailInFirebase);
/**
 * @swagger
 * /verifyUserToken:
 *   post:
 *     summary: Verify user token in Firebase
 *     tags: [Firebase User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyUserToken'
 *     responses:
 *       200:
 *         description: Token verified successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Internal server error
 */
firebaseRouter.post('/verifyUserToken', zodValidate(userSchemas.verifyToken), verifyUserTokenInFirebase);
/**
 * @swagger
 * /checkPhoneLinkedToAnyUser:
 *   get:
 *     summary: Check if a phone number is linked to any user in Firebase
 *     tags: [Firebase User]
 *     parameters:
 *       - in: query
 *         name: phoneNumber
 *         required: true
 *         schema:
 *           type: string
 *           description: Phone number to check
 *           example: "+1234567890"
 *     responses:
 *       200:
 *         description: Successful response with boolean value indicating if phone number is linked to any user
 *       400:
 *         description: Bad request (invalid input)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
firebaseRouter.get('/checkPhoneLinkedToAnyUser', zodValidateQuery(userSchemas.checkPhoneLinkedToAnyUser), checkPhoneNumberLinked);
export default firebaseRouter;
//# sourceMappingURL=firebaseUser.route.js.map