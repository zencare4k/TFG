import { Router } from 'express';
import { getUsers, createUser } from '../controllers/users.js';  // Asegúrate de que estas funciones existan

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;  // Exporta el router correctamente