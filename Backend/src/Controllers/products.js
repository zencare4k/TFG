import { connectProductDB } from "../Models/products.js";
import { ObjectId } from "mongodb";
import cloudinary from "../Utils/cloudinary.js";
import { uploadToCloudinary } from "../Middleware/upload.js";

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const dbInstance = await connectProductDB();
    const products = await dbInstance.collection("products").find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un producto por ID
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
    const { name, description, price, category, stock } = req.body;

    if (!name || !description || !price || !category || stock === undefined || !req.file) {
      return res.status(400).json({ error: "Todos los campos son obligatorios, incluida la imagen." });
    }

    const imageUrl = await uploadToCloudinary(req.file.path);

    const dbInstance = await connectProductDB();
    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock, 10),
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await dbInstance.collection("products").insertOne(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    const dbInstance = await connectProductDB();

    let updatedFields = { name, description, price, category, stock, updatedAt: new Date() };
    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.path);
      updatedFields.imageUrl = imageUrl;
    }

    const result = await dbInstance.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Eliminar un producto por ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const dbInstance = await connectProductDB();
    const result = await dbInstance.collection("products").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};