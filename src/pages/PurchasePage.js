import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyLicense, sellLicense } from '../redux/actions/gameActions';
import { useParams } from 'react-router-dom';
import './Purchase.css';

const Purchase = () => {
  const { id } = useParams();
  const games = useSelector(state => state.games.games); // Accede a la propiedad 'games'
  const selectedGame = games.find(game => game.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [isBuying, setIsBuying] = useState(true);
  const [licenseType, setLicenseType] = useState('Standard');

  const dispatch = useDispatch();

  const handleTransaction = () => {
    if (isBuying) {
      dispatch(buyLicense(selectedGame.id, quantity));
      alert('Compra realizada con éxito!');
    } else {
      if (selectedGame.licensesSold >= quantity) {
        dispatch(sellLicense(selectedGame.id, quantity));
        alert('Venta realizada con éxito!');
      } else {
        alert('No hay suficientes licencias vendidas para realizar esta operación.');
      }
    }
  };

  return (
    <div className="purchase">
      <h2>Compra/Venta de Licencias para {selectedGame.name}</h2>
      <div className="purchase-content">
        <div className="purchase-options">
          <h3>Opciones de Pago</h3>
          <label>
            Tipo de Licencia:
            <select value={licenseType} onChange={(e) => setLicenseType(e.target.value)}>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Gold">Gold</option>
            </select>
          </label>
          <label>
            Cantidad:
            <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          </label>
          <div>
            <button onClick={() => setIsBuying(true)} className={isBuying ? 'active' : ''}>
              Comprar
            </button>
            <button onClick={() => setIsBuying(false)} className={!isBuying ? 'active' : ''}>
              Vender
            </button>
          </div>
          <button onClick={handleTransaction}>{isBuying ? 'Realizar Compra' : 'Realizar Venta'}</button>
        </div>
        <div className="purchase-summary">
          <h3>Resumen de la Transacción</h3>
          <img src={selectedGame.images[0]} alt={selectedGame.name} />
          <p>{selectedGame.name}</p>
          <p>Tipo de Licencia: {licenseType}</p>
          <p>Precio Unitario: ${selectedGame.price.toLocaleString()}</p>
          <p>Cantidad: {quantity}</p>
          <p>Total: ${(selectedGame.price * quantity).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
