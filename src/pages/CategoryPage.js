import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import StatsTables from '../components/Tablas/Tablas';  // Usa el componente de tablas existente
import { GamesContext } from '../context/GameContext';

const CategoryPage = () => {
  const { category } = useParams();
  const { games } = useContext(GamesContext);

  // Filtra los juegos según la categoría
  const filteredGames = games.filter(game => game.category.toLowerCase() === category.toLowerCase());

  return (
    <div>
      <h1>Juegos de {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <StatsTables bestSellers={filteredGames} mostPlayed={filteredGames} upcomingTitles={filteredGames} />
    </div>
  );
};

export default CategoryPage;