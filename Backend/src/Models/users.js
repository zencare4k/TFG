import bcrypt from "bcryptjs";
import { connectDB } from "./index.js"; // Importa la conexión a la base de datos

const getUsersCollection = async () => {
  const { dbInstanceUsers } = await connectDB(); // Obtén la instancia de la base de datos
  return dbInstanceUsers.collection("users"); // Devuelve la colección de usuarios
};

// Buscar un usuario por correo electrónico
export const findUserByEmail = async (email) => {
  const usersCollection = await getUsersCollection();
  return await usersCollection.findOne({ email });
};

// Buscar un usuario por nombre de usuario
export const findUserByUsername = async (username) => {
  const usersCollection = await getUsersCollection();
  return await usersCollection.findOne({ username });
};

// Comparar la contraseña ingresada con la almacenada
export const comparePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

export const createUser = async (username, email, password, role = "user") => {
  const usersCollection = await getUsersCollection();

  // Verificar si el nombre de usuario ya existe
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new Error("El nombre de usuario ya está en uso");
  }

  // Verificar si el rol es válido
  const validRoles = ["user", "systemAdmin", "productAdmin"];
  if (!validRoles.includes(role)) {
    throw new Error("Rol inválido");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    username,
    email,
    password: hashedPassword,
    role, // Rol del usuario
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await usersCollection.insertOne(newUser);
  return result.insertedId; // Devuelve el ID del usuario creado
};

export const updateUser = async (id, updates) => {
  const usersCollection = await getUsersCollection();

  // Validar el rol si se incluye en las actualizaciones
  if (updates.role) {
    const validRoles = ["user", "systemAdmin", "productAdmin"];
    if (!validRoles.includes(updates.role)) {
      throw new Error("Rol inválido");
    }
  }

  const result = await usersCollection.updateOne(
    { _id: id },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  return result.modifiedCount > 0; // Devuelve true si se actualizó
};
// Eliminar un usuario
export const deleteUser = async (id) => {
  const usersCollection = await getUsersCollection();
  const result = await usersCollection.deleteOne({ _id: id });
  return result.deletedCount > 0; // Devuelve true si se eliminó
};
export const getAllUsers = async () => {
  const usersCollection = await getUsersCollection();
  return await usersCollection.find({}, { projection: { password: 0 } }).toArray(); // Excluir la contraseña
};