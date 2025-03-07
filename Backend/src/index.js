import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Models/index.js';  // Asegúrate de importar el archivo con la extensión .js
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';  // Asegúrate de importar el archivo con la extensión .js

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));