import swaggerAutogen from 'swagger-autogen';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
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
                url: 'https://bundee-auxiliary-services-dev.azurewebsites.net/',
                description: 'Deployed DEV on AZURE Environment'
            },
            {
                url: 'https://bundee-auxiliary-services-qa.azurewebsites.net/',
                description: 'Deployed QA on AZURE Environment'
            },
            {
                url: 'http://localhost:8000',
                description: 'Dev Localhost'
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
const specs = swaggerJsdoc(options);
const outputFile = './src/configs/swagger-output.json';
const endpointsFiles = ['./src/mainRouter.ts'];
swaggerAutogen()(outputFile, endpointsFiles, options.definition);
export { specs, swaggerUi };
//# sourceMappingURL=swagger.js.map