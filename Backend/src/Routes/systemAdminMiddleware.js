import { Router } from "express";
import { getAllUsers, createUser, updateUser, deleteUser } from "../Controllers/users.js";
import { authMiddleware } from "../Middleware/auth.js";
import { systemAdminMiddleware } from "../Middleware/role.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: SystemAdmin
 *     description: Operaciones administrativas de usuarios (solo para administradores del sistema)
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Obtener todos los usuarios (solo admin)
 *     tags: [SystemAdmin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error al obtener los usuarios
 *   post:
 *     summary: Crear un nuevo usuario (solo admin)
 *     tags: [SystemAdmin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: Error de validación o datos inválidos
 */

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Actualizar usuario por ID (solo admin)
 *     tags: [SystemAdmin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 *   delete:
 *     summary: Eliminar usuario por ID (solo admin)
 *     tags: [SystemAdmin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */

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