import React, { useContext, useState } from 'react';
import Carousel from '../../components/CarrusePrincipal/CarruselPrincipal';
import Categories from '../../components/CategoriaJuego/CategoriaJuego';
import GamesTable from '../../components/Tablas/Tablas';
import './SalesPage.css';
import GameList from '../../components/GameList/GameList';
import Promotions from '../../components/Promotions/Promotions';
import Sales from '../../components/Sales/Sales';
import SortedSalesTable from '../../components/Tablas/TablaOrdenada';
import SearchAndFilterBar from '../../components/SearchAndFilterBar/SearchAndFilterBar';
import GameComparison from '../../components/GameComparison/GameComparison';
import GameReviews from '../../components/GameReviews/GameReviews';
import SalesHistory from '../../components/SalesHistory/SalesHistory';
import { GamesContext } from '../../context/GameContext';


const SalesPage = () => {
  const { games } = useContext(GamesContext);
  const [selectedGame, setSelectedGame] = useState(games.length > 0 ? games[0] : null);  // Selecciona el primer juego como ejemplo

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  return (
  <div className="home">
    <Promotions />
    <SearchAndFilterBar />    
    <GameList onGameSelect={handleGameSelect} />  {/* Maneja la selección del juego */}

    <GamesTable />
    <SortedSalesTable />
      <Sales />
      {selectedGame && (
        <>
          <GameComparison selectedGame={selectedGame} />  {/* Asegúrate de que selectedGame esté definido */}
          <GameReviews gameId={selectedGame.id} />  {/* Pasa el ID del juego seleccionado */}
        </>
      )}
      <SalesHistory />
    </div>
);
};
export default SalesPage;