import { connectProductDB } from "../Models/products.js";
import { ObjectId } from "mongodb";

export const getAllProducts = async (req, res) => {
  try {
    const dbInstance = await connectProductDB();
    const products = await dbInstance.collection("products").find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const dbInstance = await connectProductDB();
    const product = await dbInstance.collection("products").findOne({ _id: new ObjectId(req.params.id) });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, discount, image, category } = req.body;
    const dbInstance = await connectProductDB();
    const newProduct = {
      name,
      description,
      price,
      originalPrice,
      discount,
      image,
      likes: 0,
      hasLiked: false,
      category,
      ratings: [],
      comments: [],
      inWishlist: false,
    };
    await dbInstance.collection("products").insertOne(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const dbInstance = await connectProductDB();
    const updatedProduct = req.body;
    const result = await dbInstance.collection("products").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedProduct }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const dbInstance = await connectProductDB();
    const result = await dbInstance.collection("products").deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};