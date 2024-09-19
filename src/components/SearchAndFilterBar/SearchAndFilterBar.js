import React, { useState, useEffect } from 'react';
import './SearchAndFilterBar.css';

const SearchAndFilterBar = ({ allGames, setGames }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    handleSearch();
  }, [searchTerm, filterCategory, filterPrice]); // Ensure search runs when any of these change

  const handleSearch = () => {
    // Ensure we are working with a copy of allGames and not mutating the original array
    let filteredGames = [...allGames];

    // Filter by search term
    if (searchTerm.trim()) {
      filteredGames = filteredGames.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory) {
      filteredGames = filteredGames.filter(game => 
        game.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Filter by maximum price
    if (filterPrice) {
      filteredGames = filteredGames.filter(game => game.price <= Number(filterPrice));
    }

    // Update the games to show the filtered results
    setGames(filteredGames);
  };

  return (
    <div className="search-filter-bar">
      <h2>Buscar y Filtrar Juegos</h2>
      
      {/* Search by name */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      {/* Filter options */}
      <div className="filter-options">
        <div className="filter-group">
          <label>Género</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
            <option value="">Todas las categorías</option>
            <option value="rompecabezas">Rompecabezas</option>
            <option value="acción">Acción</option>
            <option value="deportes">Deportes</option>
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
