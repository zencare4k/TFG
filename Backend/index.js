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

const allowedOrigins = [
  "http://localhost:3000",
  "https://tfg-hnwj.vercel.app",
  "https://tfg-61pu.vercel.app",
    "https://tfg-git-main-zencare4ks-projects.vercel.app"  

];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(bodyParser.json());
app.use('/api', routes);
app.use(swaggerRouter);

export default app;