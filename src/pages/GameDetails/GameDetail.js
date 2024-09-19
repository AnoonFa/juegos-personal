import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GamesContext } from '../../context/GameContext';
import GameReviews from '../../components/GameReviews/GameReviews';
import { usePageTitle } from '../../context/PageTitleContext';
import { useAuth } from '../../context/AuthContext'; // Importar el contexto de autenticación
import './GameDetails.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos necesarios
import { Carousel } from 'react-responsive-carousel';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useCart } from '../../context/CartContext'; // Cambiar a CartContext


const GameDetails = () => {
  const { id } = useParams();
  const { games } = useContext(GamesContext);
  const { addToCart } = useCart(); // Ahora usamos CartContext para agregar al carrito
  const { user } = useAuth(); // Obtener el usuario autenticado
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [game, setGame] = useState(null);
  const [alertMessage, setAlertMessage] = useState(''); // Mensaje de alerta personalizado
  const [alertType, setAlertType] = useState(''); // Tipo de alerta (success o error)
  const [isDisabled, setIsDisabled] = useState(false); // Para deshabilitar los botones
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

  // Validar si la cantidad es mayor a las licencias disponibles
  const validateQuantity = (value) => {
    if (value > game.licensesAvailable) {
      setAlertMessage('La cantidad excede el número de licencias disponibles.');
      setAlertType('error');
      setIsDisabled(true); // Deshabilitar los botones si la cantidad no es válida
    } else {
      setAlertMessage('');
      setAlertType('');
      setIsDisabled(false); // Habilitar los botones si la cantidad es válida
    }
  };

  const handleAddToCart = () => {
    if (quantity <= game.licensesAvailable) {
      addToCart(game, quantity); // Usamos `addToCart` de `CartContext`
      setAlertMessage('Juego agregado al carrito correctamente.');
      setAlertType('success');
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

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
      validateQuantity(value); // Validar la cantidad al cambiar
    }
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
      {/* Alerta */}
      {alertMessage && (
        <Stack sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }} spacing={2}>
          <Alert severity={alertType} onClose={() => setAlertMessage('')}>
            {alertMessage}
          </Alert>
        </Stack>
      )}

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
                  <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} disabled={isDisabled}>-</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange} // Permitimos que el usuario cambie el valor
                    min="1"
                    max={game.licensesAvailable}
                  />
                  <button onClick={() => setQuantity(quantity + 1)} disabled={quantity >= game.licensesAvailable || isDisabled}>+</button>
                </div>
                <button onClick={handleBuyNow} className="buy-now-button" disabled={isDisabled}>Cómpralo ya</button>
                <button onClick={handleAddToCart} className="add-to-cart-button" disabled={isDisabled}>Agregar al Carrito</button>
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
