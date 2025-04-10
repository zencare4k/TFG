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

// Crear un nuevo usuario
export const createUser = async (username, email, password) => {
  const usersCollection = await getUsersCollection();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    username,
    email,
    password: hashedPassword,
    isAdmin: false, // Por defecto, el usuario no es administrador
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await usersCollection.insertOne(newUser);
  return result.insertedId; // Devuelve el ID del usuario creado
};