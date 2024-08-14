import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/HomePage';
import GameDetail from './pages/GameDetail';
import PurchasePage from './pages/PurchasePage';
import './App.css';
import Login from './components/login';
import Register from './components/register.js';
import { Carousel } from 'react-responsive-carousel';
import Categories from './components/CategoriaJuego/CategoriaJuego.js';
import StatsTables from './components/Tablas/Tablas.js';
import GameCarousel from './components/CarrusePrincipal/CarruselPrincipal.js';
import PurchaseScreen from './components/PurchaseScreen/PurchaseScreen.js';
import { LeftMenu } from './components/LetfMenu/LeftMenu.js';
import { RoleProvider } from './context/RoleContext.js';
import TopMenu from './components/topMenu/topMenu.js';
import CartPage from './pages/CarritoPage.js';
import GameList from './components/GameList/GameList.js';
import GameDetails from './pages/GameDetail';
import SalesPage from './pages/SalesPage.js';
import { GamesProvider } from './context/GameContext.js';
import Sales from './components/Sales/Sales.js';
import PromotionsPage from './pages/PromotionsPage.js';
import ProtectedRoute from './components/ProtectedRoutute.js'; // Importa el componente de protección de rutas
import MasVPage from './pages/MasVPage.js';
import CategoryGames from './components/CategoriaJuego/CategoryGames.js';
import SortedSalesTable from './components/Tablas/TablaOrdenada.js';

function App() {
  return (
    <Provider store={store}> {/* Envolver con el Provider de Redux */}
      <RoleProvider>
        <GamesProvider>
          <Router>
            <TopMenu title="App Store" />
            <LeftMenu />
            
            <main>
              <Routes>
              <Route path="/" element={<Categories />} />
              <Route path="/categories/:category" element={<CategoryGames />} />
                <Route path="/MasVPage/*" element={<ProtectedRoute element={<MasVPage />} />} />
                <Route path="/PromotionsPage/*" element={<ProtectedRoute element={<PromotionsPage />} />} />
                <Route path="/SalesPage/*" element={<ProtectedRoute element={<SalesPage />} />} />
                <Route path="/Home/*" element={<Home />} />
                <Route path="/game/:id" element={<ProtectedRoute element={<GameDetails />} />} />
                <Route path="/CartPage" element={<ProtectedRoute element={<CartPage />} />} />
                <Route path="/PurchasePage/:id" element={<ProtectedRoute element={<PurchasePage />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </Router>
        </GamesProvider>
      </RoleProvider>
    </Provider>
  );
}

export default App;
