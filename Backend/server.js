import app from './index.js';
import cors from 'cors';
import mainRouter from './src/Routes/index.js';

const PORT = process.env.PORT || 5000;

// Configurar CORS correctamente
app.use(cors({
  origin: [
    "https://tfg-git-main-zencare4ks-projects.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));

// Montar solo el router principal en /api
app.use('/api', mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});