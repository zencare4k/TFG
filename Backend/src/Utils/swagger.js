import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import YAML from 'yamljs';

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
  apis: ['./src/Routes/*.js', './src/Controllers/*.js'],
};

const specs = swaggerJsdoc(options);

const swaggerRouter = Router();

// Rutas de descarga ANTES del middleware de Swagger UI
swaggerRouter.get('/docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

swaggerRouter.get('/docs/swagger.yaml', (req, res) => {
  res.setHeader('Content-Type', 'application/x-yaml');
  res.send(YAML.stringify(specs, 10));
});

// Swagger UI
swaggerRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

export default swaggerRouter;