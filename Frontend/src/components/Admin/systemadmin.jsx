import React, { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../context/AuthContext";
import "../../styles/systemadmin.css";

const UserManagement = () => {
  const { user } = useContext(AuthContext); // Obtener el usuario del contexto
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user?.role !== "systemAdmin") {
      setError("No tienes permisos para acceder a esta página");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (err) {
        setError("Error al cargar los usuarios");
        console.error(err.message);
      }
    };
    fetchUsers();
  }, [user]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await api.put(`/users/${id}`, { role: newRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
      setSuccess("Rol actualizado exitosamente");
    } catch (err) {
      setError("Error al actualizar el rol");
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setSuccess("Usuario eliminado exitosamente");
    } catch (err) {
      setError("Error al eliminar el usuario");
      console.error(err.message);
    }
  };

  if (error && user?.role !== "systemAdmin") {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="systemadmin-page">
      <h2>Gestión de Usuarios</h2>
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="user">Usuario</option>
                  <option value="systemAdmin">Admin de Sistemas</option>
                  <option value="productAdmin">Admin de Productos</option>
                </select>
              </td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(user._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;