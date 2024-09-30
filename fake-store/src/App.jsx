import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CatalogPage from "./components/CatalogPage/CatalogPage";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/CartPage/CartPage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import "./App.scss";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  </Router>
);

export default App;
