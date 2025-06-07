import React, { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../context/AuthContext";
import "../../styles/systemadmin.css";
import NotificationSystem from "../Shared/NotificationSystem";

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
        setError(err.response?.data?.error || err.message || "Error al cargar los usuarios");
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
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Error al actualizar el rol");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setSuccess("Usuario eliminado exitosamente");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Error al eliminar el usuario");
    }
  };

  if (error && user?.role !== "systemAdmin") {
    return <NotificationSystem message={error} type="error" />;
  }

  return (
    <div className="systemadmin-page">
      <h2>Gestión de Usuarios</h2>
      {error && <NotificationSystem message={error} type="error" />}
      {success && <NotificationSystem message={success} type="success" />}
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