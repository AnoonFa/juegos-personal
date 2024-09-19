import React, { useContext, useState, useEffect } from 'react';
import { GamesContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import './Library.css';
import SearchAndFilterBar from '../SearchAndFilterBar/SearchAndFilterBar';
import { useAuth } from '../../context/AuthContext';

const Library = () => {
  const { allGames } = useContext(GamesContext); // Obtener todos los juegos
  const { user } = useAuth(); // Obtener los detalles del usuario
  const navigate = useNavigate();
  const [ownedGames, setOwnedGames] = useState([]); // Guardar los juegos que posee el usuario
  const [filteredGames, setFilteredGames] = useState([]); // Guardar los juegos filtrados

  // Efecto para actualizar la lista de juegos poseídos por el usuario
  useEffect(() => {
    if (user && user.gamesOwned) {
      // Filtrar los juegos que el usuario posee
      const userOwnedGames = allGames.filter(game =>
        user.gamesOwned.some(owned => String(owned.gameId) === String(game.id))
      );
      setOwnedGames(userOwnedGames); // Actualizar el estado de juegos poseídos
      setFilteredGames(userOwnedGames); // También actualizar el estado filtrado
    }
  }, [allGames, user]); // Se asegura de que el efecto se ejecute cuando cambian allGames o user

  // Manejar clic en un juego para navegar a la página de detalles
  const handleGameClick = (game) => {
    navigate(`/game/${game.id}`, { state: { game } });
  };

  // Si el usuario no está logueado
  if (!user) {
    return <p>Por favor, inicia sesión para ver tu biblioteca.</p>;
  }

  return (
    <div className="library-page">
      <div className="library-header">
        <h1>Biblioteca</h1>
      </div>
      <div className="library-content">
        {/* Sección de filtro */}
        <div className="filter-section">
          <SearchAndFilterBar allGames={ownedGames} setGames={setFilteredGames} />
        </div>

        {/* Mostrar los juegos filtrados */}
        {filteredGames.length === 0 ? (
          <p>No tienes juegos en tu biblioteca.</p>
        ) : (
          <div className="games-grid">
            {filteredGames.map(game => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => handleGameClick(game)}
              >
                <img src={game.coverImageUrl || game.imageUrl} alt={game.name} className="game-image" />
                <h3>{game.name}</h3>
                <p>Categoría: {game.category}</p>
                <p>Licencias Disponibles: {
                  user.gamesOwned.find(owned => String(owned.gameId) === String(game.id))?.quantity || 0
                }</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
