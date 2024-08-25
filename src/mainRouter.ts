// This file is used to export all routes
import { Router } from "express";
import { getAllChatHistoryFluxRouter, getAllChatHistoryRouter } from "./routes/chat/chatHistory.route";
import createConversationRouter from "./routes/chat/createConversation.route";
import getAllChatAssetsRouter from "./routes/chat/getAllChatAssets.route";
import getClientAccessTokenRouter from "./routes/chat/getClientAccessToken.route";
import getHostAccessTokenRouter from "./routes/chat/getHostAccessToken.route";
import { clientSendMessageFluxRouter, clientSendMessageRouter, hostSendMessageRouter, systemSendMessageRouter } from "./routes/chat/message.route";
import createTuroTripOnBundeeRouter from "./routes/turo/createTuroTripOnBundee.route";
import { copyTuroVehicleDataRouter, copyTuroVehicleDataServerlessRouter } from "./routes/turo/copyTuroVehicleData.route";

const mainRouter = Router();

mainRouter.use("/createConversation", createConversationRouter);
mainRouter.use("/getAllChatAssets", getAllChatAssetsRouter);
mainRouter.use("/getHostAccessToken", getHostAccessTokenRouter);
mainRouter.use("/getClientAccessToken", getClientAccessTokenRouter);

mainRouter.use("/clientSendMessage", clientSendMessageRouter);
mainRouter.use("/hostSendMessage", hostSendMessageRouter);
mainRouter.use("/systemSendMessage", systemSendMessageRouter);
mainRouter.use("/clientSendMessageFlux", clientSendMessageFluxRouter);

mainRouter.use("/getAllChatHistory", getAllChatHistoryRouter);
mainRouter.use("/getAllChatHistoryFlux", getAllChatHistoryFluxRouter);

mainRouter.use("/createTuroTripOnBundee", createTuroTripOnBundeeRouter);

mainRouter.use("/copyTuroVehicleData", copyTuroVehicleDataRouter);
mainRouter.use("/copyTuroVehicleDataServerless", copyTuroVehicleDataServerlessRouter);

export default mainRouter;
