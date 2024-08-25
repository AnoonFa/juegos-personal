import React, { useContext } from 'react';
import { GamesContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import './GameList.css';

const GameList = () => {
  const { games } = useContext(GamesContext);
  const navigate = useNavigate();

  return (
    <div className="game-list">
      {games.map(game => (
        <div key={game.id} className="game-card" onClick={() => navigate(`/game/${game.id}`)}>
          <img src={game.imageUrl} alt={game.name} />
          <h3>{game.name}</h3>
          <p>Precio: ${game.price}</p>
          <p>Categoría: {game.category}</p>
        </div>
      ))}
    </div>
  );
};

export default GameList;
