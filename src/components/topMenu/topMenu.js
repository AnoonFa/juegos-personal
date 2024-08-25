// Importamos React y el hook useAuth para obtener la información de autenticación
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './topMenu.css';

// Ruta a los íconos
const cartIcon = require('../../assets/icons/carrito-de-compras.png');
const profileIcon = require('../../assets/icons/avatar-de-usuario.png'); // Asegúrate de tener un ícono de perfil


// Componente del menú superior
const TopMenu = () => {
  // Desestructuramos 'user' desde el contexto de autenticación
  const { user, setUser } = useAuth();
  const  navigate  = useNavigate(); // Obtenemos la función de navegación
  const location = useLocation();


  const handleCartClick = () => {
      navigate('/CartPage'); // Navega a la página del carrito
  };

  const handleLoginLogout = () => {
    // Verifica si el usuario está autenticado y tiene un rol distinto a 'nolog'
    if (user && user.role !== 'nolog') {
      // Cerrar sesión
      setUser({ role: 'nolog' });
      navigate('/login');
    } else {
      // Redirigir a la página de inicio de sesión
      navigate('/login');
    }
  };


  const handleProfileClick = () => {
    navigate('/ProfilePage');
  };

  // Mostrar el nombre de la página o el nombre de usuario si está en la página de inicio
  const title = location.pathname === '/Home' && user && user.username 
    ? `Bienvenido de vuelta, ${user.username}` 
    : location.pathname.substring(1) || 'Home';

  return (
    <div className="topMenu-container ">
      <span></span>
      <label className="title">{title}</label>
      
      <div className="image-container">
        <span></span>
        
        <img
          src={cartIcon}
          alt="Cart"
          className="cart-icon"
          onClick={handleCartClick}
        />
        <span className="espacio"> </span>


        {/* Mostrar perfil solo si el usuario está autenticado */}
        {user && user.role !== 'nolog' && (
          <>
            <img
              src={profileIcon}
              alt="Profile"
              className="profile-icon"
              onClick={handleProfileClick}
            />
            <span className="espacio"> </span>
          </>
        )}

        <button className="auth-button" onClick={handleLoginLogout}>
          {user && user.role !== 'nolog' ? 'Cerrar sesión' : 'Iniciar sesión'}
        </button>
      </div>
    </div>
  );
};

export default TopMenu;