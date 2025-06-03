import React, { useContext, useState } from "react";
import "../../styles/AddProducts.css";
import api from "../../services/api";
import { AuthContext } from "../context/AuthContext";

const AddProductPage = () => {
  const { user } = useContext(AuthContext); // Obtener el usuario autenticado
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [size, setSize] = useState("");
  const [audience, setAudience] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Restringir acceso solo a productAdmin
  if (user?.role !== "productAdmin") {
    return <p className="error">Acceso denegado: solo administradores de productos.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productName && description && price && category && stock && image && size && audience) {
      try {
        const formData = new FormData();
        formData.append("name", productName);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("stock", stock);
        formData.append("size", size);
        formData.append("audience", audience);
        formData.append("image", image);

        await api.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        });

        setSuccess("Producto añadido correctamente.");
        setError("");
        setProductName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setStock("");
        setSize("");
        setAudience("");
        setImage(null);
      } catch (err) {
        setError(err.response?.data?.error || "Error al añadir el producto.");
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
          Talla:
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Ej: S, M, L, XL"
          />
        </label>
        <label>
          Público:
          <select value={audience} onChange={e => setAudience(e.target.value)}>
            <option value="">Selecciona público</option>
            <option value="adulto">Adulto</option>
            <option value="adulta">Adulta</option>
            <option value="niño">Niño</option>
            <option value="niña">Niña</option>
          </select>
        </label>
        <label>
          Imagen:
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
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