import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/Models/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/Routes/index.js';
import swaggerRouter from './src/Utils/swagger.js';

dotenv.config();

const app = express();

connectDB();

// Permitir CORS desde localhost y cualquier subdominio de vercel.app
const allowedOrigins = [
  "http://localhost:3000",
  /\.vercel\.app$/
];

// Middleware CORS para todas las rutas
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Permite peticiones sin origen (Postman, etc.)
    if (
      allowedOrigins.some(o =>
        typeof o === "string"
          ? o === origin
          : o instanceof RegExp && o.test(origin)
      )
    ) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// Manejo explícito de preflight OPTIONS para todas las rutas
app.options('*', cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.some(o =>
        typeof o === "string"
          ? o === origin
          : o instanceof RegExp && o.test(origin)
      )
    ) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(bodyParser.json());
app.use('/api', routes);
app.use(swaggerRouter);

export default app;