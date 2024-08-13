import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './GameDetails.css';

const GameDetail = () => {
  const { id } = useParams();
  const game = useSelector(state => 
    state.games.find(game => game.id === parseInt(id))
  );

  return (
    <div className="game-detail">
      <h2>{game.name}</h2>
      <div className="game-detail-content">
        <div className="game-images">
          {game.images.map((img, idx) => (
            <img key={idx} src={img} alt={game.name} />
          ))}
        </div>
        <div className="game-info">
          <p>Categoría: {game.category}</p>
          <p>Tamaño: {(game.size / 1024).toFixed(2)} MB</p>
          <p>Precio: ${game.price.toLocaleString()}</p>
          <p>Licencias Disponibles: {game.licensesAvailable}</p>
          <p>Licencias Vendidas: {game.licensesSold}</p>
          <button>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
