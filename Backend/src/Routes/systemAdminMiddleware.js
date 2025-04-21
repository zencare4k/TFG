import { Router } from "express";
import { getAllUsers, createUser, updateUser, deleteUser } from "../Controllers/users.js";
import { authMiddleware } from "../Middleware/auth.js";
import { systemAdminMiddleware } from "../Middleware/role.js";

const router = Router();

router.get("/", authMiddleware, systemAdminMiddleware, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

router.post("/", authMiddleware, systemAdminMiddleware, async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const userId = await createUser(username, email, password, role);
    res.status(201).json({ message: "Usuario creado exitosamente", userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", authMiddleware, systemAdminMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const success = await updateUser(id, updates);
    if (!success) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

router.delete("/:id", authMiddleware, systemAdminMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const success = await deleteUser(id);
    if (!success) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

export default router;