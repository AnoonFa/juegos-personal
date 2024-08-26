import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título
import './topMenu.css';

const cartIcon = require('../../assets/icons/carrito-de-compras.png');
const profileIcon = require('../../assets/icons/avatar-de-usuario.png');

const TopMenu = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = usePageTitle(); // Obtener el título de la página desde el contexto

  const handleCartClick = () => {
    navigate('/CartPage');
  };

  const handleLoginLogout = () => {
    if (user && user.role !== 'nolog') {
      setUser({ role: 'nolog' });
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    navigate('/ProfilePage');
  };

  return (
    <div className="topMenu-container">
      <span></span>
      <label className="title">{title}</label> {/* Mostrar el título de la página */}
      
      <div className="image-container">
        <span></span>
        <img
          src={cartIcon}
          alt="Cart"
          className="cart-icon"
          onClick={handleCartClick}
        />
        <span className="espacio"> </span>
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
