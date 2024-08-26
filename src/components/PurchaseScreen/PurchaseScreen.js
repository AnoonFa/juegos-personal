import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './PurchaseScreen.css';

const PurchaseScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${id}`);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) {
    return <p>Juego no encontrado</p>;
  }

  const handlePurchase = async () => {
    if (!user) {
      alert('Debes estar autenticado para comprar juegos.');
      return;
    }

    const newLicensesAvailable = game.licensesAvailable - 1;

    if (newLicensesAvailable < 0) {
      alert('No hay suficientes licencias disponibles.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/games/${id}`, {
        licensesAvailable: newLicensesAvailable,
        licensesSold: game.licensesSold + 1,
      });

      alert('Compra realizada con éxito!');
      navigate(`/purchase/${id}`);
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert('Hubo un error al procesar la compra.');
    }
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
