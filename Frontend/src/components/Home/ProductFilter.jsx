import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import '../../styles/products.css';
import { fetchProducts } from "../../services/product_API"; // Servicio para obtener productos desde la base de datos

const ProductFilter = ({ onFilter }) => {
    const [products, setProducts] = useState([]); // Productos obtenidos de la base de datos
    const [name, setName] = useState("");
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(); // Llama al servicio para obtener productos
                setProducts(data);

                // Calcula los precios mínimos y máximos
                const prices = data.map(product => parseFloat(product.price));
                const min = Math.min(...prices);
                const max = Math.max(...prices);
                setMinPrice(min);
                setMaxPrice(max);
                setPriceRange([min, max]);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };

        loadProducts();
    }, []);

    const handleFilter = () => {
        const filteredProducts = products.filter((product) => {
            const price = parseFloat(product.price);
            return (
                product.name.toLowerCase().includes(name.toLowerCase()) &&
                price >= priceRange[0] &&
                price <= priceRange[1]
            );
        });
        onFilter(filteredProducts); // Devuelve los productos filtrados al componente padre
    };

    const handleClear = () => {
        setName("");
        setPriceRange([minPrice, maxPrice]);
        onFilter(products); // Devuelve todos los productos al componente padre
    };

    return (
        <div className="product-filter">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Buscar por nombre"
            />
            <div className="price-range">
                <label>Rango de precios:</label>
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="thumb"
                    trackClassName="track"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange}
                    onChange={(value) => setPriceRange(value)}
                />
                <div className="price-inputs">
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                        min={minPrice}
                        max={maxPrice}
                    />
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                        min={minPrice}
                        max={maxPrice}
                    />
                </div>
            </div>
            <button onClick={handleFilter}>Filtrar</button>
            <button onClick={handleClear}>Limpiar</button>
        </div>
    );
};

export default ProductFilter;