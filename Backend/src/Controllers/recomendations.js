import { connectProductDB } from "../Models/products.js";
import { ObjectId } from "mongodb";

export const getRecommendations = async (req, res) => {
  const userId = req.user.id || req.user._id || req.user.userId;
  console.log("[RECS] userId extraído del token:", userId);

  try {
    const dbInstance = await connectProductDB();

    // 1. Recomendaciones basadas en la wishlist
    const wishlist = await dbInstance.collection("wishlist").find({ userId }).toArray();
    console.log("[RECS] Wishlist del usuario:", wishlist);

    if (wishlist.length > 0) {
      const productIds = wishlist
        .map((item) => item.productId || item._id)
        .filter(Boolean)
        .map((id) => {
          try { return new ObjectId(id); } catch { return null; }
        })
        .filter(Boolean);

      console.log("[RECS] IDs de productos en wishlist:", productIds);

      if (productIds.length > 0) {
        const products = await dbInstance
          .collection("products")
          .find({ _id: { $in: productIds } })
          .toArray();
        console.log("[RECS] Productos encontrados en wishlist:", products);

        const categories = products
          .flatMap((p) => Array.isArray(p.category) ? p.category : [p.category])
          .filter(Boolean);
        console.log("[RECS] Categorías encontradas en wishlist:", categories);

        if (categories.length > 0) {
          const recommendations = await dbInstance
            .collection("products")
            .find({ category: { $elemMatch: { $in: categories } } })
            .limit(10)
            .toArray();
          console.log("[RECS] Recomendaciones por wishlist:", recommendations);
          if (recommendations.length > 0) {
            console.log("[RECS] MÉTODO USADO: wishlist");
            return res.status(200).json(recommendations);
          }
        }
      }
    }

    // 2. Recomendaciones basadas en el carrito
    const cart = await dbInstance.collection("cart").find({ userId }).toArray();
    console.log("[RECS] Carrito del usuario:", cart);

    if (cart.length > 0) {
      const productIds = cart
        .map((item) => item.productId || item._id)
        .filter(Boolean)
        .map((id) => {
          try { return new ObjectId(id); } catch { return null; }
        })
        .filter(Boolean);

      console.log("[RECS] IDs de productos en carrito:", productIds);

      if (productIds.length > 0) {
        const products = await dbInstance
          .collection("products")
          .find({ _id: { $in: productIds } })
          .toArray();
        console.log("[RECS] Productos encontrados en carrito:", products);

        const categories = products
          .flatMap((p) => Array.isArray(p.category) ? p.category : [p.category])
          .filter(Boolean);
        console.log("[RECS] Categorías encontradas en carrito:", categories);

        if (categories.length > 0) {
          const recommendations = await dbInstance
            .collection("products")
            .find({ category: { $elemMatch: { $in: categories } } })
            .limit(10)
            .toArray();
          console.log("[RECS] Recomendaciones por carrito:", recommendations);
          if (recommendations.length > 0) {
            console.log("[RECS] MÉTODO USADO: carrito");
            return res.status(200).json(recommendations);
          }
        }
      }
    }

    // 3. Recomendaciones basadas en el producto más clickeado
    const mostClickedProduct = await dbInstance
      .collection("clicks")
      .findOne({ userId }, { sort: { clicks: -1 } });
    console.log("[RECS] Producto más clickeado:", mostClickedProduct);

    if (mostClickedProduct && mostClickedProduct.productId) {
      let product;
      try {
        product = await dbInstance
          .collection("products")
          .findOne({ _id: new ObjectId(mostClickedProduct.productId) });
      } catch {
        product = null;
      }
      console.log("[RECS] Producto más clickeado encontrado:", product);

      if (product && product.category) {
        const categories = Array.isArray(product.category) ? product.category : [product.category];
        const recommendations = await dbInstance
          .collection("products")
          .find({ category: { $elemMatch: { $in: categories } } })
          .limit(10)
          .toArray();
        console.log("[RECS] Recomendaciones por clics:", recommendations);
        if (recommendations.length > 0) {
          console.log("[RECS] MÉTODO USADO: clics");
          return res.status(200).json(recommendations);
        }
      }
    }

    // 4. Recomendaciones por popularidad (fallback)
    const popularProducts = await dbInstance
      .collection("products")
      .find()
      .sort({ popularity: -1 })
      .limit(10)
      .toArray();
    console.log("[RECS] Productos populares:", popularProducts);

    if (popularProducts.length > 0) {
      console.log("[RECS] MÉTODO USADO: popularidad");
      return res.status(200).json(popularProducts);
    }

    // 5. Fallback absoluto: producto de ejemplo si no hay nada en la base de datos
    console.log("[RECS] No se encontraron productos, devolviendo producto de ejemplo");
    console.log("[RECS] MÉTODO USADO: fallback absoluto");
    return res.status(200).json([
      {
        _id: "example",
        name: "Producto de ejemplo",
        price: 0,
        imageUrl: "https://via.placeholder.com/150",
        description: "No hay productos disponibles en este momento.",
      },
    ]);
  } catch (error) {
    console.error("[RECS] Error al obtener recomendaciones:", error);
    res.status(500).json({ error: "Error al obtener recomendaciones" });
  }
};