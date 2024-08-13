import React from 'react';
import './Menu.css';

const Menu = () => (
  <nav className="menu">
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="#categorias">Categorías</a></li>
      <li><a href="#mas-vendidos">Más Vendidos</a></li>
      <li><a href="#mas-jugados">Más Jugados</a></li>
    </ul>
  </nav>
);

export default Menu;