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
import { useAuth } from '../../context/AuthContext';
import Biblioteca from '../../assets/icons/Biblioteca.png';

const LeftMenus = () => {
  const { user } = useAuth();  // Usamos el contexto de autenticación
  const navigate = useNavigate();

   // Verificar si el usuario está autenticado
  const isAuthenticated = user && user.role;
  const hasMembership = user && user.membership; // Nuevo: Verificar si el usuario tiene membresía

  return (
    <div className="leftMenu">
      <div className="container">
        <div className="logo">
          <h1>El Rincon de Juegos</h1>
        </div>

        <button className="closeButton" type="button">X</button>

        <div className="icons">
        {isAuthenticated && user.role === 'administrador' && (
          <div onClick={() => navigate("/admin")}>  
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

          {hasMembership ? (
            <div onClick={() => navigate("/SalesPage")}>
              <img src={vendeIcon} alt="ventas" />
              <label>Vende</label>
            </div>
          ) : (
            <div onClick={() => navigate("/BecomeSellerPage")}>
              <img src={vendeIcon} alt="conviertete-en-vendedor" />
              <label>Conviértete en Vendedor</label>
            </div>
          )}

          <div onClick={() => navigate("/MasVPage")}>
            <img src={flechaIcon} alt="mas-vendidos" />
            <label>El mas vendido</label>
          </div>
          {isAuthenticated && user.role === 'administrador' && (
          <div onClick={() => navigate("/Library")}>
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