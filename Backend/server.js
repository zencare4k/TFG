import app from './index.js';
import cors from 'cors';
import mainRouter from './src/Routes/index.js';

const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: true, // Permite cualquier origen
  credentials: true
}))
// Montar solo el router principal en /api
app.use('/api', mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});