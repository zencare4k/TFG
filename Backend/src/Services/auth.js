import { connectDB } from "../Models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const registerUser = async ({ name, email, password }) => {
  const db = await connectDB();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };

  await db.collection("users").insertOne(newUser);
  return newUser;
};

export const loginUser = async (email, password) => {
  const db = await connectDB();
  const user = await db.collection("users").findOne({ email });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Credenciales inválidas");
  }

  const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "1h" });
  return { user, token };
};
