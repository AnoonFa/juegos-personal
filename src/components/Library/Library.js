import React, { useContext, useState, useEffect } from 'react';
import { GamesContext } from '../../context/GameContext';
import './Library.css';
import SearchAndFilterBar from '../SearchAndFilterBar/SearchAndFilterBar';
import { useAuth } from '../../context/AuthContext';

const Library = () => {
  const { allGames, setGames } = useContext(GamesContext);
  const { user } = useAuth();

  const userOwnedGames = allGames.filter(game => game.ownerId === user.uid); // Asume que cada juego tiene un campo `ownerId`

  return (
    <div className="library-page">
      <div className="library-header">
        <h1>Biblioteca</h1>
      </div>
      <div className="library-content">
        <div className="filter-section">
          <SearchAndFilterBar allGames={userOwnedGames} setGames={setGames} />
        </div>
        <div className="games-grid">
          {userOwnedGames.map(game => (
            <div key={game.id} className="game-card">
              <img src={game.imageUrl} alt={game.name} />
              <h3>{game.name}</h3>
              <p>Categoría: {game.category}</p>
              <p>Licencias Disponibles: {game.licensesAvailable}</p>
              <p>Licencias Vendidas: {game.licensesSold}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
