import React, { useState, useEffect } from "react";
import '../../styles/CartPage.css';
import { fetchCartItems, fetchRecommendations } from '../../services/cart_API'; // Servicios para obtener datos del carrito y recomendaciones

const CartPage = () => {
    const [cart, setCart] = useState([]); // Productos en el carrito
    const [recommendations, setRecommendations] = useState([]); // Recomendaciones basadas en el carrito

    useEffect(() => {
        const loadCartData = async () => {
            try {
                // Obtén los datos del carrito desde la base de datos
                const cartItems = await fetchCartItems();
                setCart(cartItems);

                // Si hay productos en el carrito, obtén recomendaciones
                if (cartItems.length > 0) {
                    const category = cartItems[0].category; // Usa la categoría del primer producto
                    const recommendedProducts = await fetchRecommendations(category);
                    setRecommendations(recommendedProducts);
                }
            } catch (error) {
                console.error("Error al cargar los datos del carrito:", error);
            }
        };

        loadCartData();
    }, []);

    // Agrupar productos por id y contar la cantidad
    const groupedItems = cart.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id && i.color === item.color && i.size === item.size);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);

    return (
        <div className="cart-page">
            <h2>Carrito de Compras</h2>
            {groupedItems.length === 0 ? (
                <p className="empty-cart">El carrito está vacío</p>
            ) : (
                <ul>
                    {groupedItems.map((item, index) => (
                        <li key={index}>
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <p className="cart-item-name">{item.name}</p>
                                <p className="cart-item-price">{item.price}€</p>
                                <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                                <p className="cart-item-config">Color: {item.color}, Tamaño: {item.size}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {recommendations.length > 0 && (
                <div className="recommendations">
                    <h3>Recomendaciones</h3>
                    <ul>
                        {recommendations.map((item, index) => (
                            <li key={index}>
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <p className="cart-item-name">{item.name}</p>
                                    <p className="cart-item-price">{item.price}€</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CartPage;