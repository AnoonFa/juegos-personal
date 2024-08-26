import React, { useContext, useState, useEffect } from 'react';
import Carousel from '../../components/CarrusePrincipal/CarruselPrincipal';
import Categories from '../../components/CategoriaJuego/CategoriaJuego';
import GamesTable from '../../components/Tablas/Tablas';
import './SalesPage.css';
import GameList from '../../components/GameList/GameList';
import Promotions from '../../components/Promotions/Promotions';
import Sales from '../../components/Sales/Sales';
import SortedSalesTable from '../../components/Tablas/TablaOrdenada';
import GameComparison from '../../components/GameComparison/GameComparison';
import GameReviews from '../../components/GameReviews/GameReviews';
import { GamesContext } from '../../context/GameContext';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título

const SalesPage = () => {
  const { games } = useContext(GamesContext);
  const [selectedGame, setSelectedGame] = useState(games.length > 0 ? games[0] : null); // Selecciona el primer juego como ejemplo
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    setTitle('Ventas'); // Establecer el título de la página
  }, [setTitle]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="home">
      <Promotions />
      <GameList onGameSelect={handleGameSelect} />
      <GamesTable />
      <SortedSalesTable />
      <Sales />
      {selectedGame && (
        <>
          <GameComparison selectedGame={selectedGame} />
          <GameReviews gameId={selectedGame.id} />
        </>
      )}
    </div>
  );
};

export default SalesPage;
