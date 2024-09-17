import React, { useState, useContext } from 'react';
import { GamesContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { allGames } = useContext(GamesContext);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = allGames.filter(game => game.name.toLowerCase().includes(query));
      setFilteredGames(filtered);
    } else {
      setFilteredGames([]);
    }
  };

  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
    // Limpiar búsqueda y resultados cuando se selecciona un juego
    setSearchQuery('');
    setFilteredGames([]);
    setIsFocused(false); // Dejar de enfocar para quitar el fondo oscuro
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlurBackground = () => {
    setIsFocused(false);
    setSearchQuery(''); // Limpiar la búsqueda
    setFilteredGames([]); // Limpiar resultados de búsqueda
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredGames([]);
    setIsFocused(false); // Volver a la vista normal
  };

  return (
    <div className="search-wrapper">
      {isFocused && <div className="overlay" onClick={handleBlurBackground}></div>}

      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Busca juegos, recargas y más"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            className="search-inputs"
          />
          {searchQuery && (
            <button className="clear-button" onClick={handleClearSearch}>X</button>
          )}
        </div>

        {/* Mostrar juegos filtrados solo cuando hay resultados */}
        {isFocused && filteredGames.length > 0 && (
          <div className="search-results">
            {filteredGames.map(game => (
              <div key={game.id} className="search-result-item" onClick={() => handleGameClick(game.id)}>
                <img src={game.coverImageUrl} alt={game.name} className="game-cover" />
                <div className="game-info">
                  <span className="game-name">{game.name}</span>
                  
                </div>
                
                <div className="game-price">
                    {game.discount ? (
                      <>
                        <span className="discounted-price">{(game.price - (game.price * (game.discount / 100))).toFixed(2)} COP</span>
                        <span className="original-price">{game.price.toFixed(2)} COP</span>
                      </>
                    ) : (
                      <span className="price">{game.price.toFixed(2)} COP</span>
                    )}
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
