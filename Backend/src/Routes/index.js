import { Router } from 'express';
import users from './users.js';  // Asegúrate de importar el archivo con la extensión .js

const router = Router();

router.use("/users", users);  // Usa la ruta de usuarios

export default router;