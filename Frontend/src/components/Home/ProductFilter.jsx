import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import '../../styles/products.css';

const ProductFilter = ({ products, onFilter }) => {
    const [name, setName] = useState("");
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);

    useEffect(() => {
        if (products.length > 0) {
            const prices = products.map(product => parseFloat(product.price.replace('€', '')));
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setMinPrice(min);
            setMaxPrice(max);
            setPriceRange([min, max]);
        }
    }, [products]);

    useEffect(() => {
        if (priceRange[0] < minPrice || priceRange[1] > maxPrice) {
            setPriceRange([Math.max(minPrice, priceRange[0]), Math.min(maxPrice, priceRange[1])]);
        }
    }, [minPrice, maxPrice, priceRange]);

    const handleFilter = () => {
        onFilter({ name, minPrice: priceRange[0], maxPrice: priceRange[1] });
    };

    const handleClear = () => {
        setName("");
        setPriceRange([minPrice, maxPrice]);
        onFilter({ name: "", minPrice: "", maxPrice: "" });
    };

    const handleMinPriceChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setPriceRange([value, priceRange[1]]);
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setPriceRange([priceRange[0], value]);
            setMaxPrice(value);
        }
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
                        onChange={handleMinPriceChange}
                        min={minPrice}
                        max={maxPrice}
                    />
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={handleMaxPriceChange}
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