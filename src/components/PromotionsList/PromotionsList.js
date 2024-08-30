import React, { useContext } from 'react';
import { GamesContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import '../GameList/GameList.css'; // Puedes reutilizar el mismo archivo CSS
import SearchAndFilterBar from '../SearchAndFilterBar/SearchAndFilterBar';

const PromotionsList = () => {
  const { games, setGames } = useContext(GamesContext);
  const navigate = useNavigate();

  // Filtrar solo los juegos que tienen un descuento activo
  const discountedGames = games.filter(game => {
    const currentDate = new Date();
    const discountEndDate = new Date(game.promoEndDate);
    return game.discount && currentDate <= discountEndDate;
  });

  return (
    <div className="game-list-container">
      <SearchAndFilterBar allGames={discountedGames} setGames={setGames} />

      <div className="game-list">
        {discountedGames.map(game => (
          <div key={game.id} className="game-card" onClick={() => navigate(`/game/${game.id}`)}>
            <img src={game.coverImageUrl} alt={game.name} />
            <h3>{game.name}</h3>
            <p className="original-price">COP {game.price}</p>
            <p className="discounted-price">COP {(game.price - (game.price * (game.discount / 100))).toFixed(2)}</p>
            <p>Categoría: {game.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionsList;
