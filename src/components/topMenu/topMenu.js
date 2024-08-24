// Importamos React y el hook useAuth para obtener la información de autenticación
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './topMenu.css';

// Ruta a los íconos
const cartIcon = require('../../assets/icons/carrito-de-compras.png');

// Componente del menú superior
const TopMenu = ({title}) => {
  // Desestructuramos 'user' desde el contexto de autenticación
  const { user, setUser } = useAuth();
  const  navigate  = useNavigate(); // Obtenemos la función de navegación

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

        {/* Muestra el botón de Iniciar sesión o Cerrar sesión */}
        <button className="auth-button" onClick={handleLoginLogout}>
          {user && user.role !== 'nolog' ? 'Cerrar sesión' : 'Iniciar sesión'}        </button>
      </div>
    </div>
  );
};

export default TopMenu;