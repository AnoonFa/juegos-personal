import React, { useContext } from 'react';
import { GamesContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import './GameList.css';
import SearchAndFilterBar from '../SearchAndFilterBar/SearchAndFilterBar';

const GameList = () => {
  const { games, allGames, setGames } = useContext(GamesContext); // Utilizar `games` en lugar de `allGames`
  const navigate = useNavigate();

  return (
    <div className="game-list-container">
      <SearchAndFilterBar allGames={allGames} setGames={setGames} />

      <div className="game-list">
        {games.map(game => ( // Cambiado de `allGames` a `games`
          <div key={game.id} className="game-card" onClick={() => navigate(`/game/${game.id}`)}>
            <img src={game.coverImageUrl} alt={game.name} />
            <h3>{game.name}</h3>
            {game.discount && game.discountEndDate ? (
              <>
                <p className="original-price">COP {game.price}</p>
                <p className="discounted-price">COP {(game.price - (game.price * (game.discount / 100))).toFixed(2)}</p>
              </>
            ) : (
              <p>Precio: COP {game.price}</p>
            )}
            <p>Categoría: {game.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
