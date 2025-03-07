import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/Routes/*.js', './src/Controllers/*.js'], // Archivos donde se encuentran las rutas y controladores
};

const specs = swaggerJsdoc(options);

const swaggerRouter = Router();
swaggerRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

export default swaggerRouter; // Exportar por defecto