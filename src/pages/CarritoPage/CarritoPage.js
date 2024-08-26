import React, { useContext, useEffect } from 'react';
import { GamesContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título
import './CarritoPage.css';

const CartPage = () => {
  const { cart, updateGameLicenses, removeFromCart } = useContext(GamesContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    setTitle('Carrito de Compras'); // Establecer el título de la página
  }, [setTitle]);

  const calculateDiscount = () => {
    let total = 0;
    let totalPuzzles = 0;
    let totalSports = 0;
    let totalAction = 0;
    let totalDiscounted = 0;

    cart.forEach(item => {
      let itemPrice = item.price;
      const currentDate = new Date();
      const discountEndDate = new Date(item.promoEndDate);

      if (item.discount && currentDate <= discountEndDate) {
        itemPrice = itemPrice - (itemPrice * (item.discount / 100));
      }

      total += itemPrice * item.quantity;

      if (item.category === "Rompecabezas") totalPuzzles += item.quantity;
      if (item.category === "Deportes") totalSports += item.quantity;
      if (item.category === "Acción") totalAction += item.quantity;
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

  const handleQuantityChange = (id, increment) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + increment;
      if (newQuantity >= 1 && newQuantity <= item.licensesAvailable) {
        updateGameLicenses(id, increment, true);
      }
    }
  };

  const handleProceedToPayment = () => {
    if (!user) {
      navigate('/login');
    } else if (cart.length > 0) {
      navigate('/Checkout', { state: { purchaseType: 'game', cartItems: cart } });
    } else {
      alert("El carrito está vacío.");
    }
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.imageUrl} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Categoría: {item.category}</p>
              <p>Licencias Disponibles: {item.licensesAvailable}</p>
              <p>Licencias Vendidas: {item.licensesSold}</p>

              {item.discount && (
                <div>
                  <p className="original-price">Precio Original: ${item.price.toFixed(2)}</p>
                  <p className="discounted-price">Precio con Descuento: ${(item.price - (item.price * (item.discount / 100))).toFixed(2)} (-{item.discount}%)</p>
                  <p>Descuento válido hasta: {new Date(item.promoEndDate).toLocaleDateString()}</p>
                </div>
              )}
              {!item.discount && (
                <p>Precio: ${item.price.toFixed(2)}</p>
              )}

              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)} className="remove-button">Descartar</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Resumen de Compra</h2>
        <p>Total: ${total.toFixed(2)}</p>
        {discount > 0 && <p>Descuento Adicional: {discount}%</p>}
        <p>Total con Descuento: ${totalDiscounted.toFixed(2)}</p>
        <button onClick={handleProceedToPayment}>Proceder al Pago</button>
      </div>
    </div>
  );
};

export default CartPage;
