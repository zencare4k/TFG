import { connectProductDB } from "../Models/products.js";

export const getRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    const dbInstance = await connectProductDB();

    // Obtener la wishlist del usuario
    const wishlist = await dbInstance.collection("wishlist").find({ userId }).toArray();

    // Si hay productos en la wishlist, usar su categoría para recomendaciones
    if (wishlist.length > 0) {
      const categories = wishlist.map((item) => item.category);
      const recommendations = await dbInstance
        .collection("products")
        .find({ category: { $in: categories } })
        .limit(10)
        .toArray();
      return res.status(200).json(recommendations);
    }

    // Si no hay wishlist, usar el carrito del usuario
    const cart = await dbInstance.collection("cart").find({ userId }).toArray();
    if (cart.length > 0) {
      const categories = cart.map((item) => item.category);
      const recommendations = await dbInstance
        .collection("products")
        .find({ category: { $in: categories } })
        .limit(10)
        .toArray();
      return res.status(200).json(recommendations);
    }

    // Si no hay wishlist ni carrito, usar el producto más clickeado
    const mostClickedProduct = await dbInstance
      .collection("clicks")
      .findOne({ userId }, { sort: { clicks: -1 } });

    if (mostClickedProduct) {
      const recommendations = await dbInstance
        .collection("products")
        .find({ category: mostClickedProduct.category })
        .limit(10)
        .toArray();
      return res.status(200).json(recommendations);
    }

    // Si no hay datos, devolver productos populares
    const popularProducts = await dbInstance
      .collection("products")
      .find()
      .sort({ popularity: -1 })
      .limit(10)
      .toArray();
    return res.status(200).json(popularProducts);
  } catch (error) {
    console.error("Error al obtener recomendaciones:", error);
    res.status(500).json({ error: "Error al obtener recomendaciones" });
  }
};