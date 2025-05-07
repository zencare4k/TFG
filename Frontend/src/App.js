import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./components/context/AuthContext";
import HomePage from "./components/MainPages/HomePage";
import CartPage from "./components/Home/CartPage";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";
import ForgotPasswordForm from "./components/Auth/ForgotPasswordForm";
import AddProductPage from "./components/Admin/AddProduct";
import ManageProducts from "./components/Admin/ManageProducts";
import UserManagement from "./components/Admin/systemadmin";
import NotFound from "./components/Home/NotFound";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Página principal */}
      <Route path="/" element={<HomePage />} />

      {/* Carrito */}
      <Route path="/cart" element={<CartPage />} />

      {/* Autenticación */}
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />

      {/* Páginas protegidas */}
      <Route
        path="/add-product"
        element={
          user?.role === "productAdmin" ? <AddProductPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/manage-products"
        element={
          user?.role === "productAdmin" ? <ManageProducts /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/systemadmin"
        element={
          user?.role === "systemAdmin" ? <UserManagement /> : <Navigate to="/login" />
        }
      />

      {/* Página no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;