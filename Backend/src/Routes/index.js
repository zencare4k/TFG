import { Router } from 'express';
import users from './users.js';
import auth from './auth.js';
import products from './products.js'; // Importar las rutas de productos

const router = Router();

router.use("/users", users);  // Rutas de usuarios
router.use("/auth", auth);    // Rutas de autenticación
router.use("/products", products); // Rutas de productos

export default router;