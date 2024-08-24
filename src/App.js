import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CartProvider from './context/CartContext';
import TopMenu from './components/topMenu/topMenu';
import LeftMenus from './components/LetfMenu/LeftMenu';
import Categories from './components/CategoriaJuego/CategoriaJuego';
import CategoryGames from './components/CategoriaJuego/CategoryGames';
import ProtectedRoute from './components/ProtectedRoutute';
import MasVPage from './pages/VentasPage/MasVPage';
import PromotionsPage from './pages/Promotions/PromotionsPage';
import SalesPage from './pages/SalePage/SalesPage';
import Home from './pages/Home/HomePage';
import GameDetails from './pages/GameDetails/GameDetail';
import CartPage from './pages/CarritoPage/CarritoPage';
import PurchasePage from './pages/Purchase/PurchasePage';
import Login from './components/login';
import RegisterForm from './components/register';
import store from './redux/store';


function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <TopMenu title="App Store" />
            <LeftMenus/>
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
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<RegisterForm />} />
              </Routes>
            </main>
          </Router>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}


export default App;
