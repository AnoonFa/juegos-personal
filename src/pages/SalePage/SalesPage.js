import React, { useContext, useState, useEffect } from 'react';
import './SalesPage.css';
import Promotions from '../../components/Promotions/Promotions';
import Sales from '../../components/Sales/Sales';
import SortedSalesTable from '../../components/Tablas/TablaOrdenada';
import GameComparison from '../../components/GameComparison/GameComparison';
import GameReviews from '../../components/GameReviews/GameReviews';
import { GamesContext } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import { usePageTitle } from '../../context/PageTitleContext';

const SalesPage = () => {
  const { games } = useContext(GamesContext);
  const { user } = useAuth();
  const [selectedGame, setSelectedGame] = useState(null);
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Ventas');
  }, [setTitle]);

  useEffect(() => {
    if (user && games.length > 0) {
      const userGames = games.filter(game => game.sellerId === user.id);
      if (userGames.length > 0) {
        setSelectedGame(userGames[0]); // Selecciona el primer juego del usuario
      } else {
        setSelectedGame(null); // No hay juegos del usuario
      }
    }
  }, [user, games]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="home">
      <Promotions />
      <SortedSalesTable />
      <Sales />
      {selectedGame ? (
        <>
          <GameComparison selectedGame={selectedGame} />
          <GameReviews gameId={selectedGame.id} />
        </>
      ) : (
        <p>No tienes juegos disponibles para mostrar.</p>
      )}
    </div>
  );
};

export default SalesPage;
