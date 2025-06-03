import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../../services/product_API";
import { addToCart } from "../../services/cart_API";
import { addToWishlist } from "../../services/wishlist_API";
import ProductCard from "./ProductCard";
import CartPreview from "./CartPreview";
import { AuthContext } from "../context/AuthContext"; // Ajusta la ruta si es necesario

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartPreviewItems, setCartPreviewItems] = useState([]);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState(""); // Nuevo estado para mensajes

  const { user } = useContext(AuthContext); // Obtén el usuario autenticado

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

const handleAddToCart = async (product) => {
  if (!user || !user._id) {
    alert("Debes iniciar sesión para añadir al carrito.");
    return;
  }
  try {
    await addToCart({
      userId: user._id, // <-- Añade esto
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setCartPreviewItems((prevItems) => [...prevItems, product]);
    setShowCartPreview(true);
  } catch (error) {
    console.error("Error al añadir el producto al carrito:", error);
  }
};
const handleAddToWishlist = async (product) => {
  if (!user || !user._id) {
    alert("Debes iniciar sesión para añadir a la lista de deseos.");
    return;
  }
  try {
    await addToWishlist(user._id, product);
    alert("Producto añadido a la lista de deseos.");
  } catch (error) {
    if (
      error.message === "Este producto ya está en tu wishlist." ||
      (error.response && error.response.status === 409)
    ) {
      alert("¡Este producto ya está en tu lista de deseos!");
    } else {
      alert("Error al añadir a la wishlist.");
    }
  }
};
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="no-products-placeholder">
        <img src="/assets/images/no-products.png" alt="Sin productos" style={{ width: 200, opacity: 0.5 }} />
        <p>No hay productos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {wishlistMessage && (
        <div className="wishlist-message" style={{ color: "#d7263d", marginBottom: 10, fontWeight: "bold" }}>
          {wishlistMessage}
        </div>
      )}
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      ))}
      <CartPreview
        cartItems={cartPreviewItems}
        showCartPreview={showCartPreview}
        setShowCartPreview={setShowCartPreview}
      />
    </div>
  );
};

export default ProductList;