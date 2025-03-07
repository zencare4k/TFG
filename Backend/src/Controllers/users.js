import { connectDB } from "../Models/index.js";
import { ObjectId } from "mongodb";  // Importar ObjectId

export const getUsers = async (req, res) => {
  const db = await connectDB();
  const users = await db.collection("users").find().toArray();
  res.status(200).json({ results: users });
};

export const createUser = async (req, res) => {
  const db = await connectDB();
  await db.collection("users").insertOne(req.body);
  res.status(201).json({ message: "Created" });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const db = await connectDB();
  const result = await db.collection("users").updateOne(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.status(200).json({ message: "Updated" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const db = await connectDB();
  const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.status(200).json({ message: "Deleted" });
};