import React, { useState } from "react";
import "../../styles/AddProducts.css";
import { createProduct } from "../../services/product_API";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productName && description && price && category && stock && imageUrl) {
      try {
        const productData = {
          name: productName,
          description,
          price: parseFloat(price),
          category,
          stock: parseInt(stock, 10),
          image: imageUrl,
        };
        await createProduct(productData); // Enviar los datos al backend
        setSuccess("Producto añadido correctamente.");
        setError("");
        setProductName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setStock("");
        setImageUrl("");
      } catch (err) {
        setError(err.message || "Error al añadir el producto.");
        setSuccess("");
      }
    } else {
      setError("Por favor, completa todos los campos.");
      setSuccess("");
    }
  };

  return (
    <div className="add-product-page">
      <h2>Añadir Producto</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>
          Nombre del Producto:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Categoría:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </label>
        <label>
          URL de la Imagen:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Añadir Producto</button>
      </form>
    </div>
  );
};

export default AddProductPage;