import { connectDB } from "../Models/index.js";
import { ObjectId } from "mongodb"; // Importar ObjectId

export const getUsers = async (req, res) => {
  try {
    const { dbInstanceUsers } = await connectDB(); // Obtener la base de datos de usuarios
    const users = await dbInstanceUsers.collection("users").find().toArray(); // Obtener usuarios
    res.status(200).json(users); // Enviar los usuarios como respuesta
  } catch (error) {
    console.error("Error en getUsers:", error.message);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { dbInstanceUsers } = await connectDB();
    await dbInstanceUsers.collection("users").insertOne(req.body);
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("Error en createUser:", error.message);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { role, ...updates } = req.body;

  try {
    const { dbInstanceUsers } = await connectDB();

    // Validar el rol si se incluye en las actualizaciones
    if (role) {
      const validRoles = ["user", "systemAdmin", "productAdmin"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Rol inválido" });
      }
      updates.role = role; // Agregar el rol a las actualizaciones
    }

    const result = await dbInstanceUsers.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error("Error en updateUser:", error.message);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { dbInstanceUsers } = await connectDB();
    const result = await dbInstanceUsers.collection("users").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error en deleteUser:", error.message);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};