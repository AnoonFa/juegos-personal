import React, { useContext } from 'react';
import { GamesContext } from '../../context/GameContext';
import './Tablas.css';

const GamesTable = () => {
  const { games } = useContext(GamesContext);

  return (
    <div className="table-container">
      <h3>Lista de Juegos</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Juego</th>
            <th>Categoría</th>
            <th>Tamaño (KB)</th>
            <th>Precio</th>
            <th>Licencias Disponibles</th>
            <th>Licencias Vendidas</th>
          </tr>
        </thead>
        <tbody>
          {games.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-table">
                No hay juegos disponibles.
              </td>
            </tr>
          ) : (
            games.map((game) => (
              <tr key={game.id}>
                <td>{game.name}</td>
                <td>{game.category}</td>
                <td>{game.size}</td>
                <td>${game.price ? game.price.toFixed(2) : 'N/A'}</td>
                <td>{game.licensesAvailable}</td>
                <td>{game.licensesSold}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GamesTable;
