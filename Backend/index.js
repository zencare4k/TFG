import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/Models/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/Routes/index.js';
import swaggerRouter from './src/Utils/swagger.js'; // Importar el router de Swagger

// Configurar dotenv
dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', routes);
app.use(swaggerRouter); // Usar el router de Swagger

export default app;