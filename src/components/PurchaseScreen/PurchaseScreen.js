import React from 'react';
import './PurchaseScreen.css';

const PurchaseScreen = ({ game, onClose }) => {
  return (
    <div className="purchase-screen">
      <div className="purchase-header">
        <h2>Pantalla de Compra</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="purchase-body">
        <div className="purchase-summary">
          <img src={game.image} alt={game.title} />
          <div className="summary-info">
            <h3>{game.title}</h3>
            <p>Desarrollador: {game.developer}</p>
            <p>Precio Original: ${game.originalPrice}</p>
            {game.discount && <p>Descuento: {game.discount}%</p>}
            <p>Precio Final: ${game.finalPrice}</p>
            <p>IVA: ${game.tax}</p>
            <p>Recompensas Adicionales: {game.rewards}</p>
          </div>
        </div>
        <div className="payment-options">
          <h3>Opciones de Pago</h3>
          <ul>
            <li>Recompensas de Epic</li>
            <li>Tarjeta de Crédito</li>
            <li>PayPal</li>
            <li>Razer Gold Wallet</li>
          </ul>
        </div>
      </div>
      <div className="purchase-footer">
        <button className="confirm-btn">Realizar Compra</button>
        <p className="terms">Al realizar la compra, aceptas nuestros <a href="#terms">términos y condiciones</a>.</p>
      </div>
    </div>
  );
};

export default PurchaseScreen;
