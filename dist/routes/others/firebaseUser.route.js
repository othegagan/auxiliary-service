"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verfiyUserTokenRouter = exports.getUserByEmailRouter = exports.updateUserRouter = exports.createUserRouter = void 0;
const firebaseUser_controller_1 = require("../../controllers/others/firebaseUser.controller.js");
const zodValidate_1 = require("../../utils/zodValidate.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
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
    create: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email' }),
        emailVerified: zod_1.z.boolean(),
        phoneNumber: zod_1.z.string(),
        password: zod_1.z.string({ message: 'Password is required' }),
        displayName: zod_1.z.string(),
        photoURL: zod_1.z.string(),
        disabled: zod_1.z.boolean()
    }),
    update: zod_1.z.object({
        uid: zod_1.z.string().uuid({ message: 'Invalid uid' }),
        email: zod_1.z.string().email({ message: 'Invalid email' }),
        emailVerified: zod_1.z.boolean(),
        phoneNumber: zod_1.z.string(),
        password: zod_1.z.string({ message: 'Password is required' }),
        displayName: zod_1.z.string(),
        photoURL: zod_1.z.string(),
        disabled: zod_1.z.boolean()
    }),
    getByEmail: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email' })
    }),
    verifyToken: zod_1.z.object({
        token: zod_1.z.string().uuid({ message: 'Invalid token' })
    })
};
const createUserRouter = express_1.default.Router();
exports.createUserRouter = createUserRouter;
const updateUserRouter = express_1.default.Router();
exports.updateUserRouter = updateUserRouter;
const getUserByEmailRouter = express_1.default.Router();
exports.getUserByEmailRouter = getUserByEmailRouter;
const verfiyUserTokenRouter = express_1.default.Router();
exports.verfiyUserTokenRouter = verfiyUserTokenRouter;
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
createUserRouter.post('/', (0, zodValidate_1.zodValidate)(userSchemas.create), firebaseUser_controller_1.createUserInFirebase);
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
updateUserRouter.post('/', (0, zodValidate_1.zodValidate)(userSchemas.update), firebaseUser_controller_1.updateUserInFirebase);
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
getUserByEmailRouter.post('/', (0, zodValidate_1.zodValidate)(userSchemas.getByEmail), firebaseUser_controller_1.getUserByEmailInFirebase);
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
verfiyUserTokenRouter.post('/', (0, zodValidate_1.zodValidate)(userSchemas.verifyToken), firebaseUser_controller_1.verifyUserTokenInFirebase);
//# sourceMappingURL=firebaseUser.route.js.map