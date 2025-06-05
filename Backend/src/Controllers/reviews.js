import { connectProductDB } from "../Models/products.js";
import { ObjectId } from "mongodb";

// Obtener reviews de un producto
export const getProductReviews = async (req, res) => {
  try {
    const db = await connectProductDB();
    const productId = req.params.id;
    const reviews = await db.collection("reviews").find({ productId }).toArray();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reviews" });
  }
};

// Añadir una review a un producto
export const addProductReview = async (req, res) => {
  try {
    const db = await connectProductDB();
    const productId = req.params.id;
    const { rating, comment, user } = req.body;
    if (!rating || !comment || !user) {
      return res.status(400).json({ error: "Faltan datos para la review" });
    }
    const review = {
      productId,
      rating,
      comment,
      user,
      createdAt: new Date()
    };
    await db.collection("reviews").insertOne(review);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Error al añadir la review" });
  }
};