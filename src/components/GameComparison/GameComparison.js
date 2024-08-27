import React, { useContext } from 'react';
import { GamesContext } from '../../context/GameContext';
import './GameComparison.css';

const GameComparison = ({ selectedGame }) => {
  const { games, addToCart } = useContext(GamesContext);

  // Verificar si los juegos están cargados antes de filtrar
  if (!games || games.length === 0) {
    return <p>Cargando juegos...</p>;
  }

  const similarGames = games.filter(game => game.category === selectedGame.category && game.id !== selectedGame.id);

  const handleAddToCart = (gameId) => {
    addToCart(gameId, 1);
    alert('Juego agregado al carrito');
  };

  return (
    <div className="game-comparison">
      <h3>Comparativa de Juegos</h3>
      <div className="comparison-grid">
        {similarGames.map(game => (
          <div key={game.id} className="comparison-item">
            <h4>{game.name}</h4>
            <p>Precio: ${game.price}</p>
            <p>Tamaño: {game.size} KB</p>
            <p>Licencias Disponibles: {game.licensesAvailable}</p>
            <p>Licencias Vendidas: {game.licensesSold}</p>
            <button onClick={() => handleAddToCart(game.id)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameComparison;
