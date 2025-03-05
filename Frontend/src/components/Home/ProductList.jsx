import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductComparison from './ProductComparison';

const ProductList = ({ products, onAddToCart, onAddToWishlist }) => {
    const [sortedProducts, setSortedProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        const sorted = [...products].sort((a, b) => b.likes - a.likes);
        setSortedProducts(sorted);
    }, [products]);

    const handleLikeUpdate = (updatedProduct) => {
        setSortedProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            const sorted = [...updatedProducts].sort((a, b) => b.likes - a.likes);
            return sorted;
        });

        setSelectedProducts(prevSelected => {
            return prevSelected.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
        });
    };

    const handleSelectForComparison = (product) => {
        setSelectedProducts(prevSelected => {
            if (prevSelected.length < 2) {
                return [...prevSelected, product];
            } else {
                return [prevSelected[1], product];
            }
        });
    };

    return (
        <div>
            <div className="content-list">
                {sortedProducts.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={{ ...product, position: index + 1 }}
                        onAddToCart={onAddToCart}
                        onLikeUpdate={handleLikeUpdate}
                        onSelectForComparison={handleSelectForComparison}
                        onAddToWishlist={onAddToWishlist}
                    />
                ))}
            </div>
            {selectedProducts.length === 2 && (
                <ProductComparison products={selectedProducts} />
            )}
        </div>
    );
};

export default ProductList;