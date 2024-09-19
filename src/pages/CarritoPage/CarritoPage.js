import React, { useContext, useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePageTitle } from '../../context/PageTitleContext';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import './CarritoPage.css';
import { GamesContext } from '../../context/GameContext'; // Importar contexto de juegos

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart(); 
  const { games } = useContext(GamesContext); // Obtener la lista de juegos
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    setTitle('Carrito de Compras');
  }, [setTitle]);

  // Cálculo de descuentos según categorías y promociones
  const calculateDiscount = () => {
    let total = 0;
    let totalPuzzles = 0;
    let totalSports = 0;
    let totalAction = 0;
    let totalDiscounted = 0;

    cart.forEach(item => {
      const game = games.find(g => g.id === item.productId); // Buscar el juego correspondiente
      if (!game) return;

      let itemPrice = game.price;
      const currentDate = new Date();
      const discountEndDate = new Date(game.promoEndDate);

      if (game.discount && currentDate <= discountEndDate) {
        itemPrice = itemPrice - (itemPrice * (game.discount / 100));
      }

      total += itemPrice * item.quantity;

      if (game.category === "Rompecabezas") totalPuzzles += item.quantity;
      if (game.category === "Deportes") totalSports += item.quantity;
      if (game.category === "Acción") totalAction += item.quantity;
    });

    let discount = 0;
    if (totalPuzzles >= 25) {
      discount = 0.20;
    } else if (totalSports >= 20 && totalAction >= 15) {
      discount = 0.15;
    }

    totalDiscounted = total - (total * discount);

    return { total, totalDiscounted, discount: discount * 100 };
  };

  const { total, totalDiscounted, discount } = calculateDiscount();

  // Manejo de la cantidad de juegos en el carrito
  const handleQuantityChange = (id, value) => {
    const item = cart.find(item => item.productId === id);
    const game = games.find(g => g.id === id);
    if (item && game) {
      const newQuantity = parseInt(value, 10);
      if (isNaN(newQuantity) || newQuantity <= 0) {
        setAlertMessage('La cantidad debe ser un número positivo.');
        setAlertType('error');
      } else if (newQuantity > game.licensesAvailable) {
        setAlertMessage('No hay suficientes licencias disponibles.');
        setAlertType('error');
      } else {
        item.quantity = newQuantity;
        setAlertMessage(''); // Limpiar el mensaje de error si no hay problemas
        setAlertType('');
      }
    }
  };

  // Proceder al pago
  const handleProceedToPayment = () => {
    if (!user) {
      navigate('/login');
    } else if (cart.length > 0) {
      navigate('/checkout', { state: { purchaseType: 'game', cartItems: cart } }); // Pasamos los productos y el tipo de compra
    } else {
      setAlertMessage('El carrito está vacío.');
      setAlertType('error');
    }
  };
  
  

  // Eliminar un juego del carrito
  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    setAlertMessage('Juego eliminado del carrito.');
    setAlertType('success');
  };

  // Navegar a los detalles de un juego
  const handleNavigateToGameDetails = (id) => {
    navigate(`/game/${id}`);
  };

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>

      {/* Mostrar alertas si hay mensajes */}
      {alertMessage && (
        <Stack sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }} spacing={2}>
          <Alert severity={alertType} onClose={() => setAlertMessage('')}>
            {alertMessage}
          </Alert>
        </Stack>
      )}

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item, index) => {
            const game = games.find(g => g.id === item.productId); // Buscar los detalles del juego
            if (!game) return null; // Si no se encuentra el juego, omitirlo

            return (
              <div key={index} className="cart-item">
                <img src={game.coverImageUrl} alt={game.name} />
                <div className="item-details">
                  <h3 className='titulo' onClick={() => handleNavigateToGameDetails(item.productId)}>
                    {game.name}
                  </h3>
                  <p className='pp'><strong>Licencias Disponibles:</strong> {game.licensesAvailable}</p>

                  {game.discount && (
                    <div>
                      <p className="original-price">Precio Original: ${game.price.toFixed(2)}</p>
                      <p className="discounted-price">Precio con Descuento: ${(game.price - (game.price * (game.discount / 100))).toFixed(2)} (-{game.discount}%)</p>
                      <p>Descuento válido hasta: {new Date(game.promoEndDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {!game.discount && (
                    <p>Precio: ${game.price.toFixed(2)}</p>
                  )}

                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                    />
                    <button 
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= game.licensesAvailable}
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item.productId)} className="remove-button">Eliminar</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-summary">
          <h2>Resumen de Compra</h2>
          <p>Total: ${total.toFixed(2)}</p>
          {discount > 1 && <p>Descuento Adicional: {discount}%</p>}
          <p>Total con Descuento: ${totalDiscounted.toFixed(2)}</p>
          <button onClick={handleProceedToPayment}>Proceder al Pago</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
