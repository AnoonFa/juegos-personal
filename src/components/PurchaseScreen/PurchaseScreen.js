import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";  // Importar Firestore para actualizar
import { useAuth } from '../../context/AuthContext';
import './PurchaseScreen.css';

const PurchaseScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const games = []; // Suponiendo que lo obtienes de algún lugar (puedes cambiar esto para obtener los juegos de Firestore)
  const game = games.find(game => game.id === parseInt(id));

  if (!game) {
    return <p>Juego no encontrado</p>;
  }

  const handlePurchase = async () => {
    if (!user) {
      alert('Debes estar autenticado para comprar juegos.');
      return;
    }

    const gameRef = doc(db, "games", id);
    const newLicensesAvailable = game.licensesAvailable - 1;

    if (newLicensesAvailable < 0) {
      alert('No hay suficientes licencias disponibles.');
      return;
    }

    await updateDoc(gameRef, {
      licensesAvailable: newLicensesAvailable,
      licensesSold: game.licensesSold + 1
    });

    alert('Compra realizada con éxito!');
    navigate(`/purchase/${id}`);
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
