import app from './index.js';
import swaggerRouter from './src/Utils/swagger.js'; // Importar el router de Swagger
import productsRouter from './src/Routes/products.js'; // Importar el router de productos
import authRouter from './src/Routes/auth.js'; // Importar el router de autenticación
import cors from 'cors'; // Importar cors
import mainRouter from './src/Routes/index.js';
const PORT = process.env.PORT || 5000;

// Configurar CORS
app.use(cors());

app.use('/api', swaggerRouter); // Usar el router de Swagger en la ruta /api
app.use('/api', productsRouter); // Usar el router de productos en la ruta /api
app.use('/api/auth', authRouter); // Usar el router de autenticación en la ruta /api/auth
app.use('/api', mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

