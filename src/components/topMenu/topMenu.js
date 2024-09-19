import React, { useState } from 'react'; 
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoriesMenu from '../CategoriaJuego/CategoriaJuego';
import SearchBar from '../SearchBar/SearchBar';  // Importar el nuevo componente de búsqueda
import './topMenu.css';

const TopMenu = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => navigate('/CartPage');
  const handleProfileClick = () => navigate('/ProfilePage');
  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/register');
  const handleHomeClick = () => navigate('/Home');
  const handleLogoutClick = () => {
    logoutUser();  // Llamamos a la función para cerrar sesión
    navigate('/Home');  // Redirigir al usuario a la página principal
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="menu-wrapper">
      {/* Nivel superior */}
      <div className="menu-container">
        <div className="logo-container">
          <img onClick={handleHomeClick} src={require('../../assets/icons/logo.png')} alt="Logo" className="logo" />
          <h2>El Rincon de los Juegos</h2>
        </div>

        {/* Componente de búsqueda */}
        <SearchBar />
        <marquee className= "">Compra al menos 25 licencias de juegos de rompecabezas y obtén un 20% de descuento en tu pedido</marquee>

        <div className="icon-group">
          <img src={require('../../assets/icons/carrito-de-compras.png')} alt="Cart" className="icon" onClick={handleCartClick} />

          {user ? (
            <div className="auth-section">
              <div className="profile-section">
                {/* Profile Image */}
                <img
                  src={require('../../assets/icons/avatar-de-usuario.png')}  // Replace with the actual path of the profile image
                  alt="Profile"
                  className="icon profile-icon"
                  onClick={handleProfileClick}
                />
              </div>
              <span className="separator">|</span>
              <button onClick={handleLogoutClick} className="logout-button">Cerrar sesión</button>
            </div>  
          ) : (
            <div className="auth-buttons">
              <button onClick={handleLoginClick}>Iniciar sesión</button>
              <span className="separator">|</span>
              <button onClick={handleRegisterClick}>Registrarse</button>
            </div>
          )}
        </div>
      </div>

      {/* Fondo oscuro cuando el menú hamburguesa está abierto */}
      {isMenuOpen && <div className="overlay-background" onClick={toggleMenu}></div>}

      {/* Menú de Categorías */}
      <CategoriesMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Nivel inferior */}
      <div className="bottom-menu">
        <div className="category-items">
          <div className="category-menu" onClick={toggleMenu}>
            <span>Categorías &#9776;</span>
          </div>
          <div onClick={() => navigate("/Home")} className={isActive('/Home') ? 'active' : ''}>
            <span>Nuestros juegos</span>  {/* Actualizar el nombre */}
          </div>
          <div onClick={() => navigate("/PromotionsPage")} className={isActive('/PromotionsPage') ? 'active' : ''}>
            <span>Juegos en promoción</span> {/* Nueva opción */}
          </div>

          {/* Verificación de membresía */}
          {user?.membership ? (
            <div onClick={() => navigate("/SalesPage")} className={isActive('/SalesPage') ? 'active' : ''}>
              <span>Vende</span>
            </div>
          ) : (
            <div onClick={() => navigate("/BecomeSellerPage")} className={isActive('/BecomeSellerPage') ? 'active' : ''}>
              <span>Conviértete en Colaborador</span>
            </div>
          )}

          {/* Mostrar Biblioteca solo si el usuario es cliente y está logueado */}
          {user && user.role === 'cliente' && (
            <div onClick={() => navigate("/library")} className={isActive('/library') ? 'active' : ''}>
              <span>Biblioteca</span>
            </div>
          )}

          {/* Mostrar Panel de Administración solo si el usuario es administrador */}
          {user && user.role === 'administrador' && (
            <div onClick={() => navigate("/admin")} className={isActive('/admin') ? 'active' : ''}>
              <span>Panel de Administración</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
