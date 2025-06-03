import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../services/product_API";
import { addToCart } from "../../services/cart_API";
import { addToWishlist } from "../../services/wishlist_API";
import ProductCard from "../Home/ProductCard";
import { AuthContext } from "../context/AuthContext";

const audienceMap = {
  hombre: "adulto",
  mujer: "adulta",
  nino: "niño",
  nina: "niña",
};

const ProductPage = () => {
  const { publico } = useParams();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistError, setWishlistError] = useState("");
  const [cartError, setCartError] = useState("");
  const [cartSuccess, setCartSuccess] = useState("");
  const [wishlistSuccess, setWishlistSuccess] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  // Mostrar alertas para mensajes
  useEffect(() => {
    if (cartError) {
      alert(cartError);
      setCartError("");
    }
  }, [cartError]);

  useEffect(() => {
    if (cartSuccess) {
      alert(cartSuccess);
      setCartSuccess("");
    }
  }, [cartSuccess]);

  useEffect(() => {
    if (wishlistError) {
      alert(wishlistError);
      setWishlistError("");
    }
  }, [wishlistError]);

  useEffect(() => {
    if (wishlistSuccess) {
      alert(wishlistSuccess);
      setWishlistSuccess("");
    }
  }, [wishlistSuccess]);

  const filteredProducts = publico
    ? products.filter((p) => p.audience === audienceMap[publico])
    : products;

// Añadir al carrito
const handleAddToCart = async (product) => {
  setCartError("");
  setCartSuccess("");
  if (!user || !user._id) {
    setCartError("Debes iniciar sesión para añadir al carrito.");
    return;
  }
  try {
    await addToCart({
      userId: user._id,
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    });
    setCartSuccess("Producto añadido al carrito.");
  } catch (error) {
    setCartError("Error al añadir al carrito.");
  }
};

  // Añadir a la wishlist
  const handleAddToWishlist = async (product) => {
    setWishlistError("");
    setWishlistSuccess("");
    if (!user || !user._id) {
      setWishlistError("Debes iniciar sesión para añadir a la wishlist.");
      return;
    }
    try {
      await addToWishlist(user._id, product);
      setWishlistSuccess("Producto añadido a la wishlist.");
    } catch (error) {
      setWishlistError(error.message || "Error al añadir a la wishlist.");
    }
  };

  return (
    <div className="products-page">
      <h2>
        {publico
          ? `Productos para ${publico.charAt(0).toUpperCase() + publico.slice(1)}`
          : "Todos los productos"}
      </h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="products-list">
          {filteredProducts.length === 0 ? (
            <p>No hay productos para este público.</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;