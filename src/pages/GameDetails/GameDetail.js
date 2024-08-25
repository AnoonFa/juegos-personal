import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GamesContext } from '../../context/GameContext';
import GameReviews from '../../components/GameReviews/GameReviews'; // Importa el componente de reseñas
import './GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const { games, addToCart } = useContext(GamesContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const game = games.find(game => game.id === id);

  const handleAddToCart = () => {
    addToCart(game.id, quantity);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate(-1);
  };

  return (
    <div className="game-details">
      <img src={game.image} alt={game.name} />
      <div className="details">
        <h2>{game.name}</h2>
        <p>Categoría: {game.category}</p>
        <p>Tamaño: {game.size} KB</p>
        <p>Licencias Disponibles: {game.licensesAvailable}</p>
        <p>Licencias Vendidas: {game.licensesSold}</p>
        <p>Precio: ${game.price}</p>
        <div className="quantity-controls">
          <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button onClick={handleAddToCart}>Agregar al Carrito</button>
        {showAlert && (
          <div className="alert">
            <p>{game.name} ha sido agregado al carrito.</p>
            <button onClick={handleCloseAlert}>Volver</button>
          </div>
        )}
      </div>
      <GameReviews gameId={game.id} /> {/* Incluye el componente de reseñas */}
    </div>
  );
};

export default GameDetails;
