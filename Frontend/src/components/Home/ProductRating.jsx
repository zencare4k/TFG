import React, { useState, useEffect } from 'react';
import { valorateProduct } from '../../services/product_API';
import '../../styles/ProductRating.css';

const ProductRating = ({ product, onLikeUpdate }) => {
    const [likes, setLikes] = useState(product.likes);
    const [hasLiked, setHasLiked] = useState(product.hasLiked || false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        setLikes(product.likes);
        setHasLiked(product.hasLiked || false);
        setIsDisabled(false); // Habilitar el botón al cargar el componente
    }, [product.likes, product.hasLiked]);

    const handleLike = () => {
        setIsDisabled(true);
        valorateProduct(product.id, hasLiked).then(({ likes, hasLiked }) => {
            setLikes(likes);
            setHasLiked(hasLiked);
            onLikeUpdate({ ...product, likes, hasLiked });
        }).catch(error => {
            console.error(error);
            setIsDisabled(false);
        });
    };

    return (
        <div className="product-rating">
            <button onClick={handleLike} className={`like-button ${hasLiked ? 'unlike' : 'like'}`} disabled={isDisabled}>
                {hasLiked ? 'Unlike' : 'Like'}
            </button>
            <span className="likes-count">{likes} likes</span>
        </div>
    );
};

export default ProductRating;