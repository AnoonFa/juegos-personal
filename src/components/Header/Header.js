import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Menu from '../Menu/Menu';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">AppStore de Juegos</Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      {menuOpen && <Menu />} {/* Mostrar el componente Menu cuando el menú está abierto */}
    </header>
  );
};

export default Header;