import React, { useEffect, useState, useContext } from "react";
import { fetchProducts, deleteProduct, updateProduct } from "../../services/product_API";
import { AuthContext } from "../context/AuthContext";
import "../../styles/ManageProducts.css";

const ManageProducts = () => {
  const { user } = useContext(AuthContext); // Obtener el usuario autenticado
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Restringir acceso solo a productAdmin
  useEffect(() => {
    if (user?.role !== "productAdmin") {
      setError("Acceso denegado: solo administradores de productos.");
      return;
    }

    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.error || "Error al cargar los productos.");
      }
    };

    loadProducts();
  }, [user]);

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setUpdatedProduct(product);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", updatedProduct.name);
      formData.append("price", updatedProduct.price);
      formData.append("category", updatedProduct.category);
      formData.append("stock", updatedProduct.stock);
      formData.append("size", updatedProduct.size);
      formData.append("audience", updatedProduct.audience);

      if (updatedProduct.image) {
        formData.append("image", updatedProduct.image);
      }

      await updateProduct(editingProduct, formData, token);
      setProducts((prev) =>
        prev.map((product) =>
          product._id === editingProduct ? { ...updatedProduct, _id: editingProduct } : product
        )
      );
      setEditingProduct(null);
      setSuccess("Producto actualizado correctamente.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Error al actualizar el producto.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      setSuccess("Producto eliminado correctamente.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Error al eliminar el producto.");
    }
  };

  if (error && user?.role !== "productAdmin") {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="manage-products-page">
      <h2>Gestión de Productos</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table className="products-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Talla</th>
            <th>Público</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              {editingProduct === product._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={updatedProduct.name}
                      onChange={(e) =>
                        setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={updatedProduct.price}
                      onChange={(e) =>
                        setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={updatedProduct.category}
                      onChange={(e) =>
                        setUpdatedProduct({ ...updatedProduct, category: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={updatedProduct.stock}
                      onChange={(e) =>
                        setUpdatedProduct({ ...updatedProduct, stock: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={updatedProduct.size}
                      onChange={(e) =>
                        setUpdatedProduct({ ...updatedProduct, size: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={updatedProduct.audience}
                      onChange={e =>
                        setUpdatedProduct({ ...updatedProduct, audience: e.target.value })
                      }
                    >
                      <option value="">Selecciona público</option>
                      <option value="adulto">Adulto</option>
                      <option value="adulta">Adulta</option>
                      <option value="niño">Niño</option>
                      <option value="niña">Niña</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="file"
                      onChange={(e) =>
                        setUpdatedProduct({ ...updatedProduct, image: e.target.files[0] })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={handleUpdate}>Guardar</button>
                    <button onClick={() => setEditingProduct(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{product.size}</td>
                  <td>{product.audience}</td>
                  <td>
                    <button onClick={() => handleEdit(product)}>Editar</button>
                    <button onClick={() => handleDelete(product._id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;