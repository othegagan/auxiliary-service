"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webhook_controller_1 = require("../../controllers/insurance/webhook.controller.js");
const express_1 = __importDefault(require("express"));
const webhookRouter = express_1.default.Router();
webhookRouter.post('/', webhook_controller_1.webhook);
exports.default = webhookRouter;
//# sourceMappingURL=webhook.route.js.map