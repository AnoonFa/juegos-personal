import React, { useContext, useState, useEffect } from 'react';
import { GamesContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import '../GameList/GameList.css'; // Reutilizar el archivo CSS existente
import SearchAndFilterBar from '../SearchAndFilterBar/SearchAndFilterBar';

const PromotionsList = () => {
  const { games } = useContext(GamesContext);
  const navigate = useNavigate();
  const [filteredGames, setFilteredGames] = useState([]);

  // Filtrar solo los juegos que tienen un descuento activo
  useEffect(() => {
    const currentDate = new Date();
    const discountedGames = games.filter(game => {
      const discountEndDate = new Date(game.promoEndDate);
      return game.discount && currentDate <= discountEndDate;
    });
    setFilteredGames(discountedGames); // Inicialmente mostrar los juegos con descuento
  }, [games]);

  return (
    <div className="game-list-container">
      {/* Barra de búsqueda y filtro */}
      <SearchAndFilterBar allGames={filteredGames} setGames={setFilteredGames} />

      {/* Lista de juegos en promoción */}
      <div className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div key={game.id} className="game-card" onClick={() => navigate(`/game/${game.id}`)}>
              <img src={game.coverImageUrl || game.imageUrl} alt={game.name} />
              <h3>{game.name}</h3>
              <p className="original-price">COP {game.price}</p>
              <p className="discounted-price">
                COP {(game.price - (game.price * (game.discount / 100))).toFixed(2)}
              </p>
              <p>Categoría: {game.category}</p>
            </div>
          ))
        ) : (
          <p>No hay juegos en promoción disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default PromotionsList;
