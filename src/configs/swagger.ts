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

const specs = swaggerJsdoc(options);

const outputFile = './src/configs/swagger-output.json';
const endpointsFiles = ['./src/mainRouter.ts'];

swaggerAutogen()(outputFile, endpointsFiles, options.definition);

export { swaggerUi, specs };
