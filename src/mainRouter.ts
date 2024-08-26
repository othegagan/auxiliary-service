// This file is used to export all routes
import { getAllChatHistoryFluxRouter, getAllChatHistoryRouter } from '@/routes/chat/chatHistory.route';
import createConversationRouter from '@/routes/chat/createConversation.route';
import getAllChatAssetsRouter from '@/routes/chat/getAllChatAssets.route';
import getClientAccessTokenRouter from '@/routes/chat/getClientAccessToken.route';
import getHostAccessTokenRouter from '@/routes/chat/getHostAccessToken.route';
import { clientSendMessageFluxRouter, clientSendMessageRouter, hostSendMessageRouter, systemSendMessageRouter } from '@/routes/chat/message.route';
import { copyTuroVehicleDataRouter, copyTuroVehicleDataServerlessRouter } from '@/routes/turo/copyTuroVehicleData.route';
import webhookRouter from '@/routes/webhook/webhook.route';
import { Router } from 'express';
import { createUserRouter, getUserByEmailRouter, updateUserRouter, verfiyUserTokenRouter } from './routes/others/firebaseUser.route';
import getVehicleSpecificDatesRouter from './routes/others/getVehicleSpecificDates.route';
import { getByZipCodeRouter, getZipCodeRouter } from './routes/others/latLongToZipCodes';

const mainRouter = Router();


mainRouter.use('/createConversation', createConversationRouter);
mainRouter.use('/getAllChatAssets', getAllChatAssetsRouter);
mainRouter.use('/getHostAccessToken', getHostAccessTokenRouter);
mainRouter.use('/getClientAccessToken', getClientAccessTokenRouter);

mainRouter.use('/clientSendMessage', clientSendMessageRouter);
mainRouter.use('/hostSendMessage', hostSendMessageRouter);
mainRouter.use('/systemSendMessage', systemSendMessageRouter);
mainRouter.use('/clientSendMessageFlux', clientSendMessageFluxRouter);

mainRouter.use('/getAllChatHistory', getAllChatHistoryRouter);
mainRouter.use('/getAllChatHistoryFlux', getAllChatHistoryFluxRouter);

mainRouter.use('/copyTuroVehicleData', copyTuroVehicleDataRouter);
mainRouter.use('/copyTuroVehicleDataServerless', copyTuroVehicleDataServerlessRouter);

mainRouter.use('/getVehicleSpecificDates', getVehicleSpecificDatesRouter);
mainRouter.use('/api/v1/availability/getZipCode', getZipCodeRouter);
mainRouter.use('/api/v1/availability/getByZipCode', getByZipCodeRouter);

mainRouter.use('/createUser', createUserRouter);
mainRouter.use('/updateUser', updateUserRouter);
mainRouter.use('/getUserByEmail', getUserByEmailRouter);
mainRouter.use('/verifyUserToken', verfiyUserTokenRouter);

mainRouter.use('/webhook', webhookRouter);

export default mainRouter;
