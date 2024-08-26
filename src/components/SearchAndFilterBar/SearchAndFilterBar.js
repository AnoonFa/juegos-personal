import React, { useState } from 'react';
import './SearchAndFilterBar.css';

const SearchAndFilterBar = ({ allGames, setGames }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  const handleSearch = () => {
    // Siempre filtra sobre allGames
    const filteredGames = allGames.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? game.category === filterCategory : true) &&
      (filterPrice ? game.price <= filterPrice : true)
    );
    setGames(filteredGames);
  };

  return (
    <div className="search-filter-bar">
      <h2>Buscar y Filtrar Juegos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="filter-options">
        <div className="filter-group">
          <label>Género</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
            <option value="">Todas las categorías</option>
            <option value="rompecabezas">Rompecabezas</option>
            <option value="acción">Acción</option>
            <option value="deporte">Deporte</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Precio Máximo</label>
          <input
            type="number"
            placeholder="Filtrar por precio máximo"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>
      <button onClick={handleSearch} className="search-button">Buscar</button>
    </div>
  );
};

export default SearchAndFilterBar;
