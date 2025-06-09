import app from './index.js';
import cors from 'cors';
import mainRouter from './src/Routes/index.js';

const PORT = process.env.PORT || 5000;

// Permite CORS para cualquier origen, incluso con credenciales
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true
}));

app.use('/api', mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});