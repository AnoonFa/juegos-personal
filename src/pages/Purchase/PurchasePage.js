import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GamesContext } from '../../context/GameContext';
import './Purchase.css';

const PurchasePage = () => {
  const { id } = useParams(); // ID del juego desde la URL
  const { games, updateGameLicenses } = useContext(GamesContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [licenseType, setLicenseType] = useState('Standard');
  const [paymentMethod, setPaymentMethod] = useState('CreditCard');

  // Encuentra el juego usando el ID
  const game = games.find(game => game.id === parseInt(id));

  if (!game) {
    return <p>Juego no encontrado</p>; // Mensaje si el juego no se encuentra
  }

  const handleTransaction = () => {
    if (quantity > game.licensesAvailable) {
      alert('La cantidad seleccionada supera las licencias disponibles.');
    } else {
      updateGameLicenses(game.id, quantity, true);
      alert('Compra realizada con éxito!');
      navigate('/Home'); // Redirige al inicio o a la página deseada
    }
  };

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1 && newQuantity <= game.licensesAvailable) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="purchase-page">
      <h2>Compra de Licencias para {game.name}</h2>
      <div className="purchase-options">
        <p>Licencias Disponibles: {game.licensesAvailable}</p>
        <p>Licencias Vendidas: {game.licensesSold}</p>
        
        <div className="quantity-controls">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        
        <label>
          Tipo de Licencia:
          <select value={licenseType} onChange={(e) => setLicenseType(e.target.value)}>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Gold">Gold</option>
          </select>
        </label>

        <div className="payment-method">
          <h3>Método de Pago</h3>
          <label>
            <input 
              type="radio" 
              value="CreditCard" 
              checked={paymentMethod === 'CreditCard'} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
            />
            Tarjeta de Crédito
          </label>
          <label>
            <input 
              type="radio" 
              value="PayPal" 
              checked={paymentMethod === 'PayPal'} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
            />
            PayPal
          </label>
          <label>
            <input 
              type="radio" 
              value="RazerGold" 
              checked={paymentMethod === 'RazerGold'} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
            />
            Razer Gold
          </label>
        </div>

        <button onClick={handleTransaction}>Realizar Compra</button>
      </div>
      <div className="purchase-summary">
        <h3>Resumen de la Transacción</h3>
        <img src={game.image} alt={game.name} />
        <p>{game.name}</p>
        <p>Tipo de Licencia: {licenseType}</p>
        <p>Precio Unitario: ${game.price.toLocaleString()}</p>
        <p>Cantidad: {quantity}</p>
        <p>Total: ${(game.price * quantity).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PurchasePage;
