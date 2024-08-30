import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GamesContext } from '../../context/GameContext';
import GameReviews from '../../components/GameReviews/GameReviews';
import { usePageTitle } from '../../context/PageTitleContext';
import { useAuth } from '../../context/AuthContext'; // Importar el contexto de autenticación
import './GameDetails.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos necesarios
import { Carousel } from 'react-responsive-carousel';

const GameDetails = () => {
  const { id } = useParams();
  const { games, addToCart } = useContext(GamesContext);
  const { user } = useAuth(); // Obtener el usuario autenticado
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [game, setGame] = useState(null);
  const { setTitle } = usePageTitle();

  useEffect(() => {
    const foundGame = games.find(game => game.id === id);
    if (foundGame) {
      setGame(foundGame);
      setTitle(foundGame.name); 
    }
  }, [id, games, setTitle]);

  if (!game) {
    return <p>Juego no encontrado o cargando...</p>;
  }

  const handleAddToCart = () => {
    if (quantity <= game.licensesAvailable) {
      addToCart(game.id, quantity);
      setShowAlert(true);
    }
  };

  const handleBuyNow = () => {
    if (user && user.role !== 'nolog') {
      addToCart(game.id, quantity);
      navigate('/checkout', { state: { purchaseType: 'game', cartItems: [{ ...game, price: calculateDiscountedPrice(), quantity }] } });
    } else {
      navigate('/login');
    }
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
      <h2 className="game-name">{game.name}</h2>
      <div className="game-main">
        <div className="game-carousel">
          <Carousel showThumbs={true} showArrows={true} dynamicHeight={false} infiniteLoop={true}>
            {game.imageUrls.map((url, index) => (
              <div key={index}>
                <img src={url} alt={`${game.name} ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="game-info">
          <center><div className="game-logo">
            <img src={game.logoUrl} alt={`${game.name} Logo`} />
          </div></center>
          <p>Categoría: {game.category}</p>
          <p>Tamaño: {game.size} KB</p>
          <p>Licencias Disponibles: {game.licensesAvailable}</p>
          <p>Licencias Vendidas: {game.licensesSold}</p>
          <p>Descripción: {game.description}</p>
          <div className="game-menu">
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

            {game.licensesAvailable > 0 ? (
              <>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                  <input type="number" value={quantity} readOnly />
                  <button onClick={() => setQuantity(quantity + 1)} disabled={quantity >= game.licensesAvailable}>+</button>
                </div>
                <button onClick={handleBuyNow} className="buy-now-button">Cómpralo ya</button>
                <button onClick={handleAddToCart} className="add-to-cart-button">Agregar al Carrito</button>
              </>
            ) : (
              <p className="no-licenses-message">No hay licencias disponibles. Por favor, espera a que se agreguen más.</p>
            )}
          </div>
        </div>
      </div>

      <GameReviews gameId={game.id} />
    </div>
  );
};

export default GameDetails;
