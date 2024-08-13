import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/HomePage';
import GameDetail from './pages/GameDetail';
import Purchase from './pages/PurchasePage';
import './App.css';
import Login from './components/login';
import Register from './components/register.js';
import { Carousel } from 'react-responsive-carousel';
import Categories from './components/CategoriaJuego/CategoriaJuego.js';
import StatsTables from './components/Tablas/Tablas.js';
import GameCarousel from './components/CarrusePrincipal/CarruselPrincipal.js';
import PurchaseScreen from './components/PurchaseScreen/PurchaseScreen.js';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Header />
      <main>
        <GameCarousel />
        <Categories />

      </main>
      <Routes>
        <Route path="/" element={<StatsTables />} />
        <Route path="/purchase/:id" element={<Purchase />} />
        <Route path="/details/:id" element={<PurchaseScreen />} />
        <Route path="/purchase/:id" element={<Purchase />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </Provider>
  );
}

export default App;