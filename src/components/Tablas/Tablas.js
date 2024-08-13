import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Tablas.css';


const StatsTables = () => {
  const games = useSelector(state => state.games);
  const navigate = useNavigate();  // Hook para redireccionar

  const handleGameClick = (id) => {
    navigate(`/purchase/${id}`);  // Redirigir a la página de compra/venta
  };

  return (
    <section className="stats-tables">
      <div className="table" id="mas-vendidos">
        <h3>Juegos</h3>
        <div className="table-row header">
          <span>Juego</span>
          <span>Tamaño (KB)</span>
          <span>Precio</span>
          <span>Licencias Disponibles</span>
          <span>Licencias Vendidas</span>
        </div>
        {games.map(game => (
          <div key={game.id} className="table-row" onClick={() => handleGameClick(game.id)}>
            <span>{game.name}</span>
            <span>{game.size} KB</span>
            <span>${game.price.toLocaleString()}</span>
            <span>{game.licensesAvailable}</span>
            <span>{game.licensesSold}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsTables;