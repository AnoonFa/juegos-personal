import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LeftMenu.css';

// Asegúrate de que las imágenes se importen de forma correcta
import logo from '../../assets/icons/logo.png';
import usersIcon from '../../assets/icons/users.png';
import gamesIcon from '../../assets/icons/games.png';
import promocionesIcon from '../../assets/icons/promocion.png';
import compraIcon from '../../assets/icons/compra.png';
import vendeIcon from '../../assets/icons/ventas.png';
import flechaIcon from '../../assets/icons/mejor-vendido.png';
import { useAuth } from '../../context/RoleContext';

export const LeftMenu = () => {
  const { user } = useAuth();  // Usamos el contexto de autenticación
  const navigate = useNavigate();

  return (
    <div className="leftMenu">
      <div className="container">
        <div className="logo">
          <h1>AppStore</h1>
        </div>

        <button className="closeButton" type="button">X</button>

        <div className="icons">
          {user.role === 'admin' && (
            <div onClick={() => navigate("/Users")}>
              <img src={usersIcon} alt="users" />
              <label>Usuarios</label>
            </div>
          )}
          <div onClick={() => navigate("/Home")}>
            <img src={gamesIcon} alt="games" />
            <label>Juegos</label>
          </div>
          <div onClick={() => navigate("/PromotionsPage")}>
            <img src={promocionesIcon} alt="promociones" />
            <label>Promociones</label>
          </div>
          <div onClick={() => navigate("/SalesPage")}>
            <img src={compraIcon} alt="compra" />
            <label>Compra</label>
          </div>
          {user.role === 'employee' && (
            <div onClick={() => navigate("/SalesPage")}>
              <img src={vendeIcon} alt="ventas" />
              <label>Vende</label>
            </div>
          )}
          <div onClick={() => navigate("/MasVPage/")}>
            <img src={flechaIcon} alt="mas-vendidos" />
            <label>El mas vendido</label>
          </div>
        </div>
      </div>
    </div>
  );
};