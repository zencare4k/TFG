import React from 'react';
import '../../styles/products.css';

const ProductComparison = ({ products }) => {
    const [product1, product2] = products;

    return (
        <div className="product-comparison">
            <h2>Comparación de Productos</h2>
            <div className="comparison-table">
                <div className="comparison-row">
                    <div className="comparison-cell"></div>
                    <div className="comparison-cell">{product1.name}</div>
                    <div className="comparison-cell">{product2.name}</div>
                </div>
                <div className="comparison-row">
                    <div className="comparison-cell">Precio</div>
                    <div className="comparison-cell">{product1.price}</div>
                    <div className="comparison-cell">{product2.price}</div>
                </div>
                <div className="comparison-row">
                    <div className="comparison-cell">Likes</div>
                    <div className="comparison-cell">{product1.likes}</div>
                    <div className="comparison-cell">{product2.likes}</div>
                </div>
                <div className="comparison-row">
                    <div className="comparison-cell">Descripción</div>
                    <div className="comparison-cell">{product1.description}</div>
                    <div className="comparison-cell">{product2.description}</div>
                </div>
                {/* Añade más filas según las especificaciones técnicas que quieras comparar */}
            </div>
        </div>
    );
};

export default ProductComparison;