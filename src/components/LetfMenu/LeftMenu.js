import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LeftMenu.css';
import logo from '../../assets/icons/logo.png';
import usersIcon from '../../assets/icons/users.png';
import gamesIcon from '../../assets/icons/games.png';
import promocionesIcon from '../../assets/icons/promocion.png';
import compraIcon from '../../assets/icons/compra.png';
import vendeIcon from '../../assets/icons/ventas.png';
import flechaIcon from '../../assets/icons/mejor-vendido.png';
import { useAuth } from '../../context/AuthContext';
import Biblioteca from '../../assets/icons/Biblioteca.png';

const LeftMenus = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = user && user.role;
  const hasMembership = user && user.membership;

  // Función para determinar si la ruta actual coincide con una ruta específica
  const isActive = (path) => location.pathname === path;

  return (
    <div className="leftMenu">
      <div className="container">
        <div className="logo">
          <h1>El Rincon de Juegos</h1>
        </div>

        <button className="closeButton" type="button">X</button>

        <div className="icons">
          <div onClick={() => navigate("/Home")} className={isActive('/Home') ? 'active' : ''}>
            <img src={gamesIcon} alt="games" />
            <label>Juegos</label>
          </div>
          <div onClick={() => navigate("/PromotionsPage")} className={isActive('/PromotionsPage') ? 'active' : ''}>
            <img src={promocionesIcon} alt="promociones" />
            <label>Promociones</label>
          </div>
          <div onClick={() => navigate("/PurchasePage")} className={isActive('/PurchasePage') ? 'active' : ''}>
            <img src={compraIcon} alt="compra" />
            <label>Compra</label>
          </div>
          
          {isAuthenticated && user.role === 'administrador' && (
            <div onClick={() => navigate("/admin")} className={isActive('/admin') ? 'active' : ''}>
              <img src={usersIcon} alt="users" />
              <label>Usuarios</label>
            </div>
          )}

          {hasMembership ? (
            <div onClick={() => navigate("/SalesPage")} className={isActive('/SalesPage') ? 'active' : ''}>
              <img src={vendeIcon} alt="ventas" />
              <label>Vende</label>
            </div>
          ) : (
            <div onClick={() => navigate("/BecomeSellerPage")} className={isActive('/BecomeSellerPage') ? 'active' : ''}>
              <img src={vendeIcon} alt="conviertete-en-vendedor" />
              <label>Conviértete en Vendedor</label>
            </div>
          )}
          <div onClick={() => navigate("/MasVPage")} className={isActive('/MasVPage') ? 'active' : ''}>
            <img src={flechaIcon} alt="mas-vendidos" />
            <label>El más vendido</label>
          </div>

          {isAuthenticated && user.role === 'cliente' && (
            <div onClick={() => navigate("/Library")} className={isActive('/Library') ? 'active' : ''}>
              <img src={Biblioteca} alt="Biblioteca" />
              <label>Biblioteca</label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftMenus;