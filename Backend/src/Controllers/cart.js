import { connectProductDB } from "../Models/products.js";
import { ObjectId } from "mongodb";

// Función para obtener los productos del carrito
export const getCartItems = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: "userId es requerido" });
  }
  try {
    const dbInstance = await connectProductDB();
    const cartItems = await dbInstance.collection("cart").find({ userId: String(userId) }).toArray();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);
    res.status(500).json({ error: "Error al obtener los productos del carrito" });
  }
};

export const clearUserCart = async (req, res) => {
  try {
    const dbInstance = await connectProductDB();
    await dbInstance.collection("cart").deleteMany({ userId: String(req.user.id) });
    res.json({ success: true, message: "Carrito vaciado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al vaciar el carrito" });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, name, price, imageUrl, size } = req.body; // <-- Añade size

  if (!userId) {
    return res.status(400).json({ success: false, message: "userId es requerido" });
  }

  try {
    const dbInstance = await connectProductDB();
    const product = await dbInstance.collection("products").findOne({ _id: new ObjectId(productId) });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Busca si ya existe en el carrito de este usuario y talla
    const existingItem = await dbInstance.collection("cart").findOne({
      userId: String(userId),
      productId: String(productId),
      size: size || "M" // Considera talla al buscar duplicados
    });

    if (existingItem) {
      await dbInstance.collection("cart").updateOne(
        { userId: String(userId), productId: String(productId), size: size || "M" },
        { $inc: { quantity: 1 } }
      );
    } else {
      const newCartItem = {
        userId: String(userId),
        productId: String(productId),
        name,
        price,
        imageUrl,
        quantity: 1,
        category: product.category,
        size: size || "M" // Guarda la talla, por defecto "M"
      };
      await dbInstance.collection("cart").insertOne(newCartItem);
    }

    res.status(201).json({ message: "Producto añadido al carrito" });
  } catch (error) {
    console.error("Error al añadir el producto al carrito:", error);
    res.status(500).json({ error: "Error al añadir el producto al carrito" });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const dbInstance = await connectProductDB();
    const result = await dbInstance.collection("cart").deleteOne({
      userId: String(userId),
      productId: String(productId)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }

    res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);
    res.status(500).json({ error: "Error al eliminar el producto del carrito" });
  }
};

// (Opcional) Endpoint para actualizar la talla de un producto en el carrito
export const updateCartItemSize = async (req, res) => {
  const { userId, productId, size } = req.body;
  try {
    const dbInstance = await connectProductDB();
    await dbInstance.collection("cart").updateOne(
      { userId: String(userId), productId: String(productId) },
      { $set: { size } }
    );
    res.json({ message: "Talla actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la talla" });
  }
};