import { connectDB } from "../Models/index.js";

export const getUsers = async (req, res) => {
  const db = await connectDB();
  const users = await db.collection("users").find().toArray();
  res.status(200).json({ results: users });
};

export const getUserId = async (req, res) => {
  const db = await connectDB();
  const user = await db.collection("users").findOne({ _id: req.params.id });
  res.status(200).json(user);
};

export const createUser = async (req, res) => {
  const db = await connectDB();
  await db.collection("users").insertOne(req.body);
  res.status(201).json({ message: "Created" });
};