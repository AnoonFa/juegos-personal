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
import { GamesProvider } from './context/GameContext';
import './App.css';
import BecomeSellerPage from './pages/BecomeSellerPage/BecomeSellerPage';
import Checkout from './components/checkout/Checkout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Library from './components/Library/Library';
import Carousel from './components/CarrusePrincipal/CarruselPrincipal';
import StatsTables from './components/Tablas/Tablas';
import GameList from './components/GameList/GameList';
import SortedSalesTable from './components/Tablas/TablaOrdenada';
import AdminPage from './pages/AdminPage/AdminPage';
import { PageTitleProvider } from './context/PageTitleContext';
import Footer from './components/Footer/Footer';



function App() {
  return (
    <Router>
      <AuthProvider>
        <PageTitleProvider>
          <GamesProvider>
            <CartProvider>
          
            <TopMenu title="App Store" />
            <LeftMenus/>
            <main>
              <Routes>
                <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />                
                <Route path="/Library/*" element={<ProtectedRoute element={<Library />}/>} />
                <Route path="/ProfilePage/*" element={<ProtectedRoute element={<ProfilePage />} />} />
                <Route path="/BecomeSellerPage/*" element={<ProtectedRoute element={<BecomeSellerPage />} />} />
                <Route path="/Checkout" element={<ProtectedRoute element={<Checkout />} />} />
                <Route path="/" element={<ProtectedRoute element={<Categories />} />} />
                <Route path="/categories/:category" element={<ProtectedRoute element={<CategoryGames />} />} />
                <Route path="/MasVPage/*" element={<ProtectedRoute element={<MasVPage />} />} />
                <Route path="/PromotionsPage/*" element={<ProtectedRoute element={<PromotionsPage />} />} />
                <Route path="/SalesPage/*" element={<ProtectedRoute element={<SalesPage />} />} />
                <Route path="/Home/*" element={<Home />} />
                <Route path="/game/:id" element={<ProtectedRoute element={<GameDetails />} />} />
                <Route path="/CartPage" element={<ProtectedRoute element={<CartPage />} />} />
                <Route path="/PurchasePage" element={<ProtectedRoute element={<PurchasePage />} />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<RegisterForm />} />
              </Routes>
              
            </main><Footer/>
          
            </CartProvider>
          </GamesProvider>
        </PageTitleProvider>
      </AuthProvider></Router>
    
  );
}


export default App;
