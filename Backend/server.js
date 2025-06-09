import app from './index.js';
import cors from 'cors';
import mainRouter from './src/Routes/index.js';

const PORT = process.env.PORT || 5000;

// Permitir CORS desde cualquier origen (con credenciales)
app.use(cors({
  origin: (origin, callback) => callback(null, origin),
  credentials: true
}));

app.use('/api', mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});