import { connectDB } from "../Models/index.js";
import { ObjectId } from "mongodb";

// Añadir producto a la wishlist
export const addToWishlist = async (req, res) => {
  const { userId, product } = req.body;
  if (!userId || !product || !product._id) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  try {
    const { dbInstanceUsers } = await connectDB();
    // Comprobar si ya existe ese producto para ese usuario
    const exists = await dbInstanceUsers
      .collection("wishlist")
      .findOne({ userId, "product._id": product._id });

    if (exists) {
      return res.status(400).json({ message: "Este producto ya está en tu lista de deseos" });
    }

    // Insertar el producto en la wishlist
    await dbInstanceUsers.collection("wishlist").insertOne({
      userId,
      product,
    });

    res.status(201).json({ message: "Producto añadido a la wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error al añadir a la wishlist" });
  }
};