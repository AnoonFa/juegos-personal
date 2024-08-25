import React, { useState, useContext } from 'react';
import { GamesContext } from '../../context/GameContext';
import './SearchAndFilterBar.css';

const SearchAndFilterBar = () => {
  const { allGames, setGames } = useContext(GamesContext); // Usamos `allGames` en lugar de `games`
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  const handleSearch = () => {
    const filteredGames = allGames.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? game.category === filterCategory : true) &&
      (filterPrice ? game.price <= filterPrice : true)
    );
    setGames(filteredGames); // Actualizamos `games` con los juegos filtrados
  };

  return (
    <div className="search-filter-bar">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="">Todas las categorías</option>
        <option value="rompecabezas">Rompecabezas</option>
        <option value="acción">Acción</option>
        <option value="deporte">Deporte</option>
      </select>
      <input
        type="number"
        placeholder="Filtrar por precio máximo"
        value={filterPrice}
        onChange={(e) => setFilterPrice(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchAndFilterBar;
