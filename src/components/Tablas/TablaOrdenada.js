import React, { useContext } from 'react';
import { GamesContext } from '../../context/GameContext';
import './Tablas.css';

const SortedSalesTable = () => {
  const { games } = useContext(GamesContext);
  const sortedGames = [...games].sort((a, b) => b.licensesSold - a.licensesSold);

  return (
    <div className="table-container">
      <h3>Top Juegos Más Vendidos</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Juego</th>
            <th>Categoría</th>
            <th>Tamaño (KB)</th>
            <th>Precio</th>
            <th>Licencias Vendidas</th>
          </tr>
        </thead>
        <tbody>
          {sortedGames.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-table">
                No hay ventas registradas.
              </td>
            </tr>
          ) : (
            sortedGames.map((game) => (
              <tr key={game.id}>
                <td>{game.name}</td>
                <td>{game.category}</td>
                <td>{game.size}</td>
                <td>${game.price ? game.price.toFixed(2) : 'N/A'}</td>
                <td>{game.licensesSold}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SortedSalesTable;