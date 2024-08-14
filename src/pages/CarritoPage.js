import React, { useContext } from 'react';
import { GamesContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import './CarritoPage.css';

const CartPage = () => {
  const { cart, games, updateGameLicenses } = useContext(GamesContext);
  const navigate = useNavigate();

  const calculateDiscount = () => {
    let total = 0;
    let totalPuzzles = 0;
    let totalSports = 0;
    let totalAction = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
      if (item.category === "rompecabezas") totalPuzzles += item.quantity;
      if (item.category === "deporte") totalSports += item.quantity;
      if (item.category === "acción") totalAction += item.quantity;
    });

    let discount = 0;
    if (totalPuzzles >= 25) {
      discount = 0.20;
    } else if (totalSports >= 20 && totalAction >= 15) {
      discount = 0.15;
    }

    const discountedTotal = total - (total * discount);
    return { total, discountedTotal, discount: discount * 100 };
  };

  const { total, discountedTotal, discount } = calculateDiscount();

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
    navigate('/PurchasePage/:id');  // Redirige a la página de pago
  };

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Licencias Disponibles: {item.licensesAvailable}</p>
              <p>Licencias Vendidas: {item.licensesSold}</p>
              <p>Precio: ${item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Resumen de Compra</h2>
        <p>Total: ${total.toFixed(2)}</p>
        {discount > 0 && <p>Descuento: {discount}%</p>}
        <p>Total con Descuento: ${discountedTotal.toFixed(2)}</p>
        <button onClick={handleProceedToPayment}>Proceder al Pago</button>
      </div>
    </div>
  );
};

export default CartPage;
