import React from 'react';
import './Tablas.css'; // Asegúrate de definir estilos CSS adecuados

const GameTables = ({ bestSellers, mostPlayed, upcomingTitles }) => {
  const renderTable = (title, games) => (
    <div className="game-table">
      <h2>{title}</h2>
      {games.map((game, index) => (
        <div key={index} className="game-row">
          <img src={game.image} alt={game.title} />
          <div className="game-info">
            <h3>{game.title}</h3>
            <p>{game.price ? `Price: $${game.price}` : 'Free'}</p>
            {game.discount && <p>Discount: {game.discount}%</p>}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="game-tables">
      {renderTable('Más Vendidos', bestSellers)}
      {renderTable('Más Jugados', mostPlayed)}
      {renderTable('Próximos Títulos', upcomingTitles)}
    </div>
  );
};

export default GameTables;
