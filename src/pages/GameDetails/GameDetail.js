import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GamesContext } from '../../context/GameContext';
import GameReviews from '../../components/GameReviews/GameReviews';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título
import './GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const { games, addToCart } = useContext(GamesContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [game, setGame] = useState(null);
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    const foundGame = games.find(game => game.id === id);
    if (foundGame) {
      setGame(foundGame);
      setTitle(foundGame.name); // Establecer el título de la página
    }
  }, [id, games, setTitle]);

  if (!game) {
    return <p>Juego no encontrado o cargando...</p>;
  }

  const handleAddToCart = () => {
    addToCart(game.id, quantity);
    setShowAlert(true);
  };

  const handleBuyNow = () => {
    addToCart(game.id, quantity);
    navigate('/checkout', { state: { purchaseType: 'game', cartItems: [{ ...game, price: calculateDiscountedPrice(), quantity }] } });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate(-1);
  };

  const calculateDiscountedPrice = () => {
    const currentDate = new Date();
    const discountEndDate = new Date(game.promoEndDate);

    if (game.discount && currentDate <= discountEndDate) {
      return game.price - (game.price * (game.discount / 100));
    }
    return game.price;
  };

  const discountedPrice = calculateDiscountedPrice();

  return (
    <div className="game-details">
      <img src={game.imageUrl} alt={game.name} className="game-image" />
      <div className="details">
        <h2>{game.name}</h2>
        <p>Categoría: {game.category}</p>
        <p>Tamaño: {game.size} KB</p>
        <p>Licencias Disponibles: {game.licensesAvailable}</p>
        <p>Licencias Vendidas: {game.licensesSold}</p>
        <p>Descripción: {game.description}</p>
        {game.discount && game.promoEndDate ? (
          <>
            <p className="original-price">Precio Original: ${game.price.toFixed(2)}</p>
            <p className="discounted-price">
              Precio con Descuento: ${discountedPrice.toFixed(2)} (-{game.discount}%)
            </p>
            <p>Descuento válido hasta: {new Date(game.promoEndDate).toLocaleDateString()}</p>
          </>
        ) : (
          <p>Precio: ${game.price.toFixed(2)}</p>
        )}
        <div className="quantity-controls">
          <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button onClick={handleBuyNow} className="buy-now-button">Cómpralo ya</button>
        <button onClick={handleAddToCart} className="add-to-cart-button">Agregar al Carrito</button>
        {showAlert && (
          <div className="alert">
            <p>{game.name} ha sido agregado al carrito.</p>
            <button onClick={handleCloseAlert}>Volver</button>
          </div>
        )}
      </div>
      <GameReviews gameId={game.id} /> 
    </div>
  );
};

export default GameDetails;
