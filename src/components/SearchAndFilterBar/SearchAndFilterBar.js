import React, { useState, useEffect } from 'react';
import './SearchAndFilterBar.css';

const SearchAndFilterBar = ({ allGames, setGames }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    handleSearch();
  }, [searchTerm, filterCategory, filterPrice]); // Asegura que el filtro se ejecute cuando alguno cambie

  const handleSearch = () => {
    let filteredGames = [...allGames]; // Hacer una copia de allGames para no mutar el array original

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filteredGames = filteredGames.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (filterCategory) {
      filteredGames = filteredGames.filter(game => 
        game.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Filtrar por precio máximo
    if (filterPrice) {
      filteredGames = filteredGames.filter(game => game.price <= Number(filterPrice));
    }

    // Actualizar los juegos con los resultados filtrados
    setGames(filteredGames);
  };

  return (
    <div className="search-filter-bar">
      <h2>Buscar y Filtrar Juegos</h2>
      
      {/* Búsqueda por nombre */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      {/* Opciones de filtro */}
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
