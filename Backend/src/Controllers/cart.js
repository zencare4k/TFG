import { connectProductDB } from "../Models/products.js";

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

export const addToCart = async (req, res) => {
  const { productId, name, price, imageUrl } = req.body; // `imageUrl` debe ser la URL de Cloudinary

  try {
    const dbInstance = await connectProductDB();
    const existingItem = await dbInstance.collection("cart").findOne({ productId });

    if (existingItem) {
      // Incrementar la cantidad si el producto ya está en el carrito
      await dbInstance.collection("cart").updateOne(
        { productId },
        { $inc: { quantity: 1 } }
      );
    } else {
      // Añadir un nuevo producto al carrito
      const newCartItem = { productId, name, price, imageUrl, quantity: 1 };
      await dbInstance.collection("cart").insertOne(newCartItem);
    }

    res.status(201).json({ message: "Producto añadido al carrito" });
  } catch (error) {
    console.error("Error al añadir el producto al carrito:", error);
    res.status(500).json({ error: "Error al añadir el producto al carrito" });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const dbInstance = await connectProductDB();
    const result = await dbInstance.collection("cart").deleteOne({ productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }

    res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);
    res.status(500).json({ error: "Error al eliminar el producto del carrito" });
  }
};