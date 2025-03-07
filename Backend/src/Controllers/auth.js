import { connectDB } from "../Models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import { ObjectId } from "mongodb";  // Importar ObjectId

export const registerUser = async (req, res) => {
  const { name, email, password, isAdmin, adminPassword } = req.body;

  // Verificar si se requiere la contraseña de administrador
  if (isAdmin && adminPassword !== config.adminPassword) {
    return res.status(403).json({ error: "Contraseña de administrador incorrecta" });
  }

  try {
    const { dbInstanceUsers } = await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword, isAdmin };

    await dbInstanceUsers.collection("users").insertOne(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { dbInstanceUsers } = await connectDB();
    const user = await dbInstanceUsers.collection("users").findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales inválidas");
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, config.jwtSecret, { expiresIn: "1h" });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const { dbInstanceUsers } = await connectDB();
    const user = await dbInstanceUsers.collection("users").findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};