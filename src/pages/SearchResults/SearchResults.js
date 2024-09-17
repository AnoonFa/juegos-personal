import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GamesContext } from '../../context/GameContext';
import './SearchResults.css';

const SearchResults = () => {
  const { allGames } = useContext(GamesContext);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query')?.toLowerCase() || '';

    if (query) {
      const results = allGames.filter(game => game.name.toLowerCase().includes(query));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [location.search, allGames]);

  return (
    <div className="search-results-page">
      <h2>Resultados de búsqueda para: {new URLSearchParams(location.search).get('query')}</h2>
      <div className="results-list">
        {searchResults.length > 0 ? (
          searchResults.map(game => (
            <div key={game.id} className="result-item">
              <img src={game.coverImageUrl} alt={game.name} className="result-cover" />
              <h3>{game.name}</h3>
              <p>Categoría: {game.category}</p>
              <p>Precio: {game.price}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
