import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext"; // Importa el AuthProvider
import Header from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";
import HeroSection from "./components/Home/HeroSection";
import ProductList from "./components/Home/ProductList";
import CartPage from "./components/Home/CartPage";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm"; // Importa el componente LoginForm
import ForgotPasswordForm from "./components/Auth/ForgotPasswordForm"; // Importa el componente ForgotPasswordForm
import AddProductPage from "./components/Admin/AddProduct"; // Página para añadir productos
import ManageProducts from "./components/Admin/ManageProducts"; // Página para gestionar productos
import NotFound from "./components/Home/NotFound";

function App() {
  return (
    <AuthProvider> {/* Envuelve toda la aplicación */}
      <Router>
        <div>
          <header>
            <Header />
          </header>
          <main style={{ paddingTop: "60px", paddingBottom: "60px" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <ProductList />
                  </>
                }
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/add-product" element={<AddProductPage />} /> {/* Ruta para añadir productos */}
              <Route path="/manage-products" element={<ManageProducts />} /> {/* Ruta para gestionar productos */}
              <Route path="*" element={<NotFound />} />
            </Routes>
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