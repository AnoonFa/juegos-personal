import React, { useState } from 'react';
import './Sales.css';

const UserGames = ({ games, userId }) => {
  const [showMore, setShowMore] = useState(false);
  const userGames = games.filter(game => game.sellerId === userId && game.licensesAvailable > 0);

  const displayedGames = showMore ? userGames : userGames.slice(0, 3); // Mostrar solo 3 juegos por defecto

  return (
    <div className="existing-games">
      <h2>Tus Juegos</h2>
      {displayedGames.length > 0 ? (
        displayedGames.map(game => (
          <div key={game.id} className="game-card">
            <img src={game.logoUrl || game.imageUrl} alt={game.name} />
            <h3>{game.name}</h3>
            <button className='agregarlicencias'>Agregar más licencias</button>
          </div>
        ))
      ) : (
        <p>No tienes juegos disponibles para vender.</p>
      )}
      {userGames.length > 3 && (
        <button className="mostrar-mas" onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Mostrar menos' : 'Mostrar más'}
        </button>
      )}
    </div>
  );
};

export default UserGames;
