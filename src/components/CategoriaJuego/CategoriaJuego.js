import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../topMenu/topMenu.css';

const logoIcon = require('../../assets/icons/logo.png');

const CategoriesMenu = ({ isMenuOpen, toggleMenu }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}`);
    toggleMenu(false); // Cerrar el menú después de seleccionar una categoría
  };

  return (
    <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
      <div className="topbar-menu">
        {/* Logo y botón "X" alineados */}
        <img src={logoIcon} alt="Logo" className="menu-logo" />
        <button className="close-btn" onClick={toggleMenu}>X</button>
      </div>
      
      <ul className="menu-list">
        <li onClick={() => handleCategoryClick('Rompecabezas')}>Rompecabezas</li>
        <li onClick={() => handleCategoryClick('Deportes')}>Deportes</li>
        <li onClick={() => handleCategoryClick('Acción')}>Acción</li>

      </ul>
    </div>
  );
};

export default CategoriesMenu;
