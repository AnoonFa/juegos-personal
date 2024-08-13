import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Tablas.css';

const StatsTables = () => {
  const games = useSelector(state => state.games.games); // Accede a la propiedad 'games'
  const navigate = useNavigate();

  const handleGameClick = (id) => {
    navigate(`/purchase/${id}`);
  };

  const sortedGames = (key) => {
    return [...games].sort((a, b) => b[key] - a[key]);
  };

  return (
    <section className="stats-tables">
      <div className="table" id="mas-vendidos">
        <h3>Juegos Más Vendidos</h3>
        <div className="table-row header">
          <span>Juego</span>
          <span>Tamaño (KB)</span>
          <span>Precio</span>
          <span>Licencias Disponibles</span>
          <span>Licencias Vendidas</span>
        </div>
        {sortedGames('licensesSold').map(game => (
          <div key={game.id} className="table-row" onClick={() => handleGameClick(game.id)}>
            <span>{game.name}</span>
            <span>{game.size} KB</span>
            <span>${game.price.toLocaleString()}</span>
            <span>{game.licensesAvailable}</span>
            <span>{game.licensesSold}</span>
          </div>
        ))}
      </div>

      <div className="table" id="mas-comprados">
        <h3>Juegos Más Comprados</h3>
        <div className="table-row header">
          <span>Juego</span>
          <span>Tamaño (KB)</span>
          <span>Precio</span>
          <span>Licencias Disponibles</span>
          <span>Licencias Compradas</span>
        </div>
        {sortedGames('licensesBought').map(game => (
          <div key={game.id} className="table-row" onClick={() => handleGameClick(game.id)}>
            <span>{game.name}</span>
            <span>{game.size} KB</span>
            <span>${game.price.toLocaleString()}</span>
            <span>{game.licensesAvailable}</span>
            <span>{game.licensesBought}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsTables;
