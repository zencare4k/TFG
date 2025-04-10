import { connectDB } from "../Models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import { ObjectId } from "mongodb"; // Importar ObjectId
import { findUserByEmail, findUserByUsername, comparePassword, createUser } from "../Models/users.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el usuario con isAdmin: false por defecto
    const newUser = {
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { dbInstanceUsers } = await connectDB();
    await dbInstanceUsers.collection("users").insertOne(newUser);

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Busca el usuario por nombre de usuario
    const user = await findUserByUsername(username);
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Genera un token JWT
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      user: { username: user.username, email: user.email, isAdmin: user.isAdmin },
      token,
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};