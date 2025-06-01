import { connectDB } from "../Models/index.js";

// Añadir producto a la wishlist
export const addToWishlist = async (req, res) => {
  const { userId, product } = req.body;
  if (!userId || !product || !product._id) {
    return res.status(400).json({ error: "userId o product inválido" });
  }
  try {
    const { dbInstanceUsers } = await connectDB();
    // Comprobar si ya existe ese producto para ese usuario
    const exists = await dbInstanceUsers.collection("wishlist").findOne({
      userId: String(userId),
      "product._id": String(product._id),
    });
    if (exists) {
      return res.status(409).json({ error: "Producto ya en la wishlist" });
    }
    await dbInstanceUsers.collection("wishlist").insertOne({
      userId: String(userId),
      product: {
        ...product,
        _id: String(product._id),
        price: Number(product.price), // Asegura tipo numérico si es necesario
        stock: Number(product.stock), // Asegura tipo numérico si es necesario
      },
    });
    // Devuelve la wishlist actualizada tras añadir
    const wishlist = await dbInstanceUsers.collection("wishlist").find({ userId: String(userId) }).toArray();
    return res.status(201).json({ message: "Producto añadido a la wishlist", wishlist });
  } catch (error) {
    return res.status(500).json({ error: "Error al añadir a la wishlist" });
  }
};
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { dbInstanceUsers } = await connectDB();
    // Busca todos los documentos de wishlist para ese usuario
    const wishlistDocs = await dbInstanceUsers.collection("wishlist").find({ userId: String(userId) }).toArray();
    // Devuelve solo el array de productos
    const wishlist = wishlistDocs.map(item => item.product);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la wishlist' });
  }
};
// Eliminar producto de la wishlist
export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const { dbInstanceUsers } = await connectDB();
    const result = await dbInstanceUsers.collection("wishlist").deleteOne({
      userId: String(userId),
      "product._id": String(productId),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado en la wishlist" });
    }
    res.status(200).json({ message: "Producto eliminado de la wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar de la wishlist" });
  }
};