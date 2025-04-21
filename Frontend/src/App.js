import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./components/context/AuthContext";
import Header from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";
import HeroSection from "./components/Home/HeroSection";
import ProductList from "./components/Home/ProductList";
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
      <Route
        path="/"
        element={
          <>
            <HeroSection />
            <ProductList />
          </>
        }
      />

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
          user?.role === "productAdmin" ? (
            <AddProductPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/manage-products"
        element={
          user?.role === "productAdmin" ? (
            <ManageProducts />
          ) : (
            <Navigate to="/login" />
          )
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <header>
            <Header />
          </header>
          <main style={{ paddingTop: "60px", paddingBottom: "60px" }}>
            <AppRoutes />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;