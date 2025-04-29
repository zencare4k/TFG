import { connectProductDB } from "../Models/products.js";

export const getCartItems = async (req, res) => {
  try {
    const dbInstance = await connectProductDB();
    const cartItems = await dbInstance.collection("cart").find().toArray();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error al obtener los datos del carrito:", error);
    res.status(500).json({ error: "Error al obtener los datos del carrito" });
  }
};

export const addToCart = async (req, res) => {
  const { productId, name, price, imageUrl } = req.body;

  try {
    const dbInstance = await connectProductDB();
    const newCartItem = { productId, name, price, imageUrl, quantity: 1 };
    await dbInstance.collection("cart").insertOne(newCartItem);
    res.status(201).json(newCartItem);
  } catch (error) {
    console.error("Error al añadir el producto al carrito:", error);
    res.status(500).json({ error: "Error al añadir el producto al carrito" });
  }
};