import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PurchaseScreen.css';

const PurchaseScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Aquí deberías obtener la información del juego desde tu estado o API
  const games = []; // Suponiendo que lo obtienes de algún lugar
  const game = games.find(game => game.id === parseInt(id));

  if (!game) {
    return <p>Juego no encontrado</p>;
  }

  const handlePurchase = () => {
    navigate(`/purchase/${id}`); // Redirige a la página de compra/venta
  };

  return (
    <div className="purchase-screen">
      <div className="purchase-header">
        <h2>Pantalla de Compra</h2>
        <button className="close-btn" onClick={() => navigate(-1)}>×</button>
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
        <button className="confirm-btn" onClick={handlePurchase}>Proceder a la Compra/Venta</button>
      </div>
    </div>
  );
};

export default PurchaseScreen;
