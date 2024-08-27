import React, { useContext, useState, useEffect } from 'react';
import { GamesContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import './Library.css';
import SearchAndFilterBar from '../SearchAndFilterBar/SearchAndFilterBar';
import { useAuth } from '../../context/AuthContext';
import Footer from '../Footer/Footer';

const Library = () => {
  const { allGames } = useContext(GamesContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    // Verificar si el usuario está definido
    if (user && user.gamesOwned) {
      const userOwnedGames = allGames.filter(game =>
        user.gamesOwned.some(owned => owned.gameId === game.id)
      );
      setFilteredGames(userOwnedGames);
    }
  }, [allGames, user]);

  const handleGameClick = (game) => {
    navigate(`/game/${game.id}`, { state: { game } });
  };

  if (!user) {
    return <p>Por favor, inicia sesión para ver tu biblioteca.</p>;
  }

  return (<>
    <div className="library-page">
      <div className="library-header">
        <h1>Biblioteca</h1>
      </div>

      <div className="filter-section">
        <SearchAndFilterBar allGames={filteredGames} setGames={setFilteredGames} />
      </div>

      <div className="games-grid">
        {filteredGames.map(game => (
          <div
            key={game.id}
            className="game-card"
            onClick={() => handleGameClick(game)}
          >
            <img src={game.imageUrl} alt={game.name} />
            <h3>{game.name}</h3>
            <p>Categoría: {game.category}</p>
            <p>Licencias Disponibles: {
              user.gamesOwned.find(owned => owned.gameId === game.id)?.quantity || 0
            }</p>
          </div>
        ))}
      </div>
      
    </div>
    
    </>
  );
};

export default Library;
