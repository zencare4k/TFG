import { connectDB } from "../Models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, findUserByUsername, comparePassword, createUser } from "../Models/users.js";

export const registerUser = async (req, res) => {
  const { username, email, password, role = "user" } = req.body; // Asignar "user" como valor predeterminado para el rol

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Validar el rol proporcionado
    const validRoles = ["user", "systemAdmin", "productAdmin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    // Crear el usuario con el rol especificado
    const newUser = {
      username,
      email,
      password: hashedPassword,
      role, // Asignar el rol
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { dbInstanceUsers } = await connectDB();
    await dbInstanceUsers.collection("users").insertOne(newUser);

    res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    console.log("Buscando usuario:", username);
    const user = await findUserByUsername(username);

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    console.log("Usuario encontrado:", user);

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      console.log("Contraseña inválida");
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    console.log("Contraseña válida, generando token...");

const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
);
    console.log("Token generado:", token);

res.status(200).json({
  token,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  }
});  } catch (error) {
    console.error("Error en loginUser:", error.message);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};