import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import FloatingWishlistIcon from "./components/Layout/FloatingWishList";
import Header from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";
import Checkout from "./components/CheckoutFlow/checkout"; // Asegúrate de que la ruta es correcta

const EXCLUDED_WISHLIST_PATHS = [
  "/add-product",
  "/manage-products",
  "/login",
  "/register"
];

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Determina si se debe mostrar el FloatingWishlistIcon
  const showWishlistIcon =
    user &&
    user._id &&
    !EXCLUDED_WISHLIST_PATHS.some((path) => location.pathname.startsWith(path));

  return (
    <>
      <Header />
      {showWishlistIcon && <FloatingWishlistIcon userId={user._id} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
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