import app from './index.js';
import cors from 'cors';
import mainRouter from './src/Routes/index.js';

const PORT = process.env.PORT || 5000;

// Middleware CORS (deja esto)
app.use(cors({
  origin: (origin, callback) => callback(null, origin),
  credentials: true
}));

// AÑADE ESTE MIDDLEWARE MANUALMENTE JUSTO DESPUÉS DEL CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use('/api', mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});