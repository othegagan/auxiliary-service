// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for your Express application'
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 3000}`,
            description: 'Development server'
        }
    ]
};
// Options for the swagger docs
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./src/routes/*.ts'] // Adjust the path to match your routes
};
// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);
export { swaggerUi, specs };
