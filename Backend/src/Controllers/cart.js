import { connectProductDB } from "../Models/products.js";

export const getCartItems = async (req, res) => {
    try {
        const dbInstance = await connectProductDB();
        const cartItems = await dbInstance.collection("cart").find().toArray(); // Obtiene los datos del carrito
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error al obtener los datos del carrito:", error);
        res.status(500).json({ error: "Error al obtener los datos del carrito" });
    }
};