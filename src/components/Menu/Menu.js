import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Asegúrate de definir estilos CSS adecuados


const Menu = () => {
  return (
    <nav className="nav-menu">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/categorias">Categorías</Link></li>
        <li><Link to="/contacto">Contáctenos</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
