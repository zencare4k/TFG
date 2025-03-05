import React, { useEffect, useRef } from "react";
import '../../styles/products.css';
import { useNavigate } from "react-router-dom";

const CartPreview = ({ cartItems = [], setShowCartPreview }) => {
    const navigate = useNavigate();
    const cartPreviewRef = useRef(null);

    // Agrupar productos por id y contar la cantidad
    const groupedItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    const totalItems = cartItems.length;

    // Manejar clics fuera del CartPreview para cerrarlo
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartPreviewRef.current && !cartPreviewRef.current.contains(event.target)) {
                setShowCartPreview(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowCartPreview]);

    return (
        <div className="cart-preview" ref={cartPreviewRef}>
            <h3>Carrito de Compras ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</h3>
            {groupedItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <ul>
                    {groupedItems.map((item, index) => (
                        <li key={index}>
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <p className="cart-item-name">{item.name}</p>
                                <p className="cart-item-price">{item.price}</p>
                                <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <button className="view-cart-button" onClick={() => navigate('/cart')}>Ver Carrito</button>
        </div>
    );
};

export default CartPreview;