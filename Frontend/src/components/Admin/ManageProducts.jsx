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

  useEffect(() => {
    if (!user?.isAdmin) {
      setError("Acceso denegado: solo administradores.");
      return;
    }

    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Error al cargar los productos.");
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
      await updateProduct(editingProduct, updatedProduct);
      setProducts((prev) =>
        prev.map((product) =>
          product._id === editingProduct ? { ...updatedProduct, _id: editingProduct } : product
        )
      );
      setEditingProduct(null);
      setSuccess("Producto actualizado correctamente.");
    } catch (err) {
      setError("Error al actualizar el producto.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      setSuccess("Producto eliminado correctamente.");
    } catch (err) {
      setError("Error al eliminar el producto.");
    }
  };

  if (!user?.isAdmin) {
    return <p className="error">Acceso denegado: solo administradores.</p>;
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