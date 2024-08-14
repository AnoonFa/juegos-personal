  import React from 'react';
  import { Provider } from 'react-redux';
  import store from './redux/store';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Home from './pages/Home/HomePage.js';
  import PurchasePage from './pages/Purchase/PurchasePage.js';
  import './App.css';
  import Login from './components/login.js';
  import Register from './components/register.js';
  import Categories from './components/CategoriaJuego/CategoriaJuego.js';
  import { LeftMenu } from './components/LetfMenu/LeftMenu.js';
  import { RoleProvider } from './context/RoleContext.js';
  import TopMenu from './components/topMenu/topMenu.js';
  import CartPage from './pages/CarritoPage/CarritoPage.js';
  import GameDetails from './pages/GameDetails/GameDetail.js';
  import SalesPage from './pages/SalePage/SalesPage.js';
  import { GamesProvider } from './context/GameContext.js';
  import PromotionsPage from './pages/Promotions/PromotionsPage.js';
  import ProtectedRoute from './components/ProtectedRoutute.js'; // Importa el componente de protección de rutas
  import MasVPage from './pages/VentasPage/MasVPage.js';
  import CategoryGames from './components/CategoriaJuego/CategoryGames.js';

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
