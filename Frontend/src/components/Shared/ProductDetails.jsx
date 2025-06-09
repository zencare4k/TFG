import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProductDetail.css";
import { AuthContext } from "../context/AuthContext";
import { fetchProductById, fetchProductReviews, submitReview } from "../../services/product_API";
import { addToCart } from "../../services/cart_API"; // Importa el servicio

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const prod = await fetchProductById(id);
      setProduct(prod);
      const revs = await fetchProductReviews(id);
      setReviews(revs);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleRating = (star) => setMyRating(star);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!myRating || !myComment) return;
    await submitReview(id, { rating: myRating, comment: myComment, user: user?.username || "Anónimo" });
    setMyRating(0);
    setMyComment("");
    const revs = await fetchProductReviews(id);
    setReviews(revs);
  };

  // --- Añadir al carrito ---
  const handleAddToCart = async () => {
    if (!user || !user._id) {
      alert("Debes iniciar sesión para añadir al carrito.");
      return;
    }
    try {
      await addToCart({
        userId: user._id,
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
        category: product.category,
      });
      alert("Producto añadido al carrito.");
    } catch (error) {
      alert("Error al añadir el producto al carrito.");
    }
  };

  if (loading || !product) return <div className="product-detail-loading">Cargando...</div>;

  // Calcular medias
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "Sin valoraciones";

  return (
    <div className="product-detail-page">
      <div className="product-detail-main">
        <img src={product.imageUrl} alt={product.name} className="product-detail-img" />
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-price">{product.price}€</p>
          <p className="product-detail-desc">{product.description}</p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </div>
      </div>
      <div className="product-detail-extra">
        <h2>Opiniones de clientes</h2>
        <div className="product-detail-rating-summary">
          <span className="product-detail-avg-rating">{avgRating}</span>
          <span className="product-detail-stars">
            {[1,2,3,4,5].map(star => (
              <span key={star} className={avgRating >= star ? "star filled" : "star"}>★</span>
            ))}
          </span>
          <span>({reviews.length} opiniones)</span>
        </div>
        <ul className="product-detail-reviews">
          {reviews.length === 0 && <li>No hay opiniones aún.</li>}
          {reviews.map((r, i) => (
            <li key={i}>
              <div className="review-header">
                <span className="review-user">{r.user}</span>
                <span className="review-stars">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className={r.rating >= star ? "star filled" : "star"}>★</span>
                  ))}
                </span>
              </div>
              <div className="review-comment">{r.comment}</div>
            </li>
          ))}
        </ul>
        {user && (
          <form className="product-detail-review-form" onSubmit={handleSubmitReview}>
            <h3>Valora este producto</h3>
            <div className="review-stars-input">
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  className={myRating >= star ? "star filled" : "star"}
                  onClick={() => handleRating(star)}
                >★</span>
              ))}
            </div>
            <textarea
              value={myComment}
              onChange={e => setMyComment(e.target.value)}
              placeholder="Escribe tu opinión..."
              required
            />
            <button type="submit" className="add-to-cart-button">Enviar opinión</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;