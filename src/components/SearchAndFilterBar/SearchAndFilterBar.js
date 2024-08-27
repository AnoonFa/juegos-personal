import React, { useState, useEffect } from 'react';
import './SearchAndFilterBar.css';

const SearchAndFilterBar = ({ allGames, setGames }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    // Restablecer juegos cuando se cambien los filtros
    handleSearch();
  }, [searchTerm, filterCategory, filterPrice]);

  const handleSearch = () => {
    // Trabaja sobre allGames para asegurarte de que no se modifique
    let filteredGames = [...allGames];

    if (searchTerm) {
      filteredGames = filteredGames.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      filteredGames = filteredGames.filter(game => game.category === filterCategory);
    }

    if (filterPrice) {
      filteredGames = filteredGames.filter(game => game.price <= filterPrice);
    }

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
            <option value="deportes">Deporte</option>
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
    </div>
  );
};

export default SearchAndFilterBar;
