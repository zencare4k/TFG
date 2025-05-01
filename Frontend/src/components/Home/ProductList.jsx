import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/product_API";
import { addToCart } from "../../services/cart_API"; // Servicio para añadir al carrito
import ProductCard from "./ProductCard";
import CartPreview from "./CartPreview"; // Importar el componente de preview del carrito

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartPreviewItems, setCartPreviewItems] = useState([]); // Estado para el preview del carrito
  const [showCartPreview, setShowCartPreview] = useState(false); // Estado para mostrar el preview del carrito

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(); // Llama al servicio para obtener productos
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
    try {
      await addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
  
      // Añadir el producto al preview del carrito
      setCartPreviewItems((prevItems) => [...prevItems, product]);
      setShowCartPreview(true); // Mostrar el preview del carrito
    } catch (error) {
      console.error("Error al añadir el producto al carrito:", error);
    }
  };
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (!products || products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
      ))}
      <CartPreview
        cartItems={cartPreviewItems} // Pasar los productos al preview
        showCartPreview={showCartPreview}
        setShowCartPreview={setShowCartPreview}
      />
    </div>
  );
};

export default ProductList;