"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = exports.swaggerUi = void 0;
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MyBundee Auxiliary APIs',
            version: '2.0.0',
            description: 'Auxiliary APIs for MyBundee. Includes chat, turo vehicle data, firebase admin operations and others.'
        },
        servers: [
            {
                url: 'https://auxiliary-service.onrender.com/',
                description: 'Deployed Dev Environment'
            },
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/**/*.ts'] // Path to the API docs
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.specs = specs;
const outputFile = './src/configs/swagger-output.json';
const endpointsFiles = ['./src/mainRouter.ts'];
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, options.definition);
//# sourceMappingURL=swagger.js.map