
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import PurchasePage from './pages/PurchasePage';
import PromotionsPage from './pages/PromotionsPage';
import './App.css';
import CategoryMenu from './components/CategoriaJuego/CategoriaJuego';
import Carrusel from './components/CarrusePrincipal/CarruselPrincipal';

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <CategoryMenu/>
        <Carrusel />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;