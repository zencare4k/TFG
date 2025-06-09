import app from './index.js';
import cors from 'cors';
import mainRouter from './src/Routes/index.js';

const PORT = process.env.PORT || 5000;

// SOLO ESTO, SIN MIDDLEWARE MANUAL
const allowedOrigins = [
  "https://tfg-61pu.vercel.app", // tu frontend en Vercel
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use('/api', mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});