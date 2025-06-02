import { connectProductDB } from "../Models/products.js";
import { ObjectId } from "mongodb";

// Función para obtener los productos del carrito
export const getCartItems = async (req, res) => {
  try {
    const dbInstance = await connectProductDB();
    const cartItems = await dbInstance.collection("cart").find().toArray(); // Obtener todos los productos del carrito
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);
    res.status(500).json({ error: "Error al obtener los productos del carrito" });
  }
};
export const clearUserCart = async (req, res) => {
  try {
    const dbInstance = await connectProductDB();
    await dbInstance.collection("carts").updateOne(
      { userId: req.user.id },
      { $set: { items: [] } }
    );
    res.json({ success: true, message: "Carrito vaciado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al vaciar el carrito" });
  }
};

export const addToCart = async (req, res) => {
  const { productId, name, price, imageUrl } = req.body;

  try {
    const dbInstance = await connectProductDB();

    // Busca el producto para obtener su categoría
    const product = await dbInstance.collection("products").findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const existingItem = await dbInstance.collection("cart").findOne({ productId });

    if (existingItem) {
      await dbInstance.collection("cart").updateOne(
        { productId },
        { $inc: { quantity: 1 } }
      );
    } else {
      // Añade la categoría al nuevo producto del carrito
      const newCartItem = {
        productId,
        name,
        price,
        imageUrl,
        quantity: 1,
        category: product.category // <-- Añade la categoría aquí
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
  const { productId } = req.params; // Cambia 'id' por 'productId'

  try {
    const dbInstance = await connectProductDB();
    const result = await dbInstance.collection("cart").deleteOne({ _id: new ObjectId(productId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }

    res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);
    res.status(500).json({ error: "Error al eliminar el producto del carrito" });
  }
};