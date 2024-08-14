import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './topMenu.css';
import { useAuth } from '../../context/RoleContext';

// Ruta a los íconos
const cartIcon = require('../../assets/icons/carrito-de-compras.png');

const TopMenu = ({ title }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // Obtenemos el usuario del contexto

  const handleCartClick = () => {
    if (user.role !== 'nolog') {
      navigate('/CartPage'); // Navega a la página del carrito
    } else {
      alert('Por favor, inicia sesión para acceder al carrito.');
      navigate('/Home');
    }
  };

  const handleLoginLogout = () => {
    if (user.role !== 'nolog') {
      // Cerrar sesión
      setUser({ role: 'nolog' });
      navigate('/Home');
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
        <span></span>

        {/* Muestra el botón de Iniciar sesión o Cerrar sesión */}
        <button className="auth-button" onClick={handleLoginLogout}>
          {user.role !== 'nolog' ? 'Cerrar sesión' : 'Iniciar sesión'}
        </button>
      </div>
    </div>
  );
};

export default TopMenu;