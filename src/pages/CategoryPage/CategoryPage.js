import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StatsTables from '../components/Tablas/Tablas';  
import { GamesContext } from '../context/GameContext';
import { usePageTitle } from '../context/PageTitleContext'; // Importar el contexto del título

const CategoryPage = () => {
  const { category } = useParams();
  const { games } = useContext(GamesContext);
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    setTitle(`Juegos de ${category.charAt(0).toUpperCase() + category.slice(1)}`); // Establecer el título de la página
  }, [category, setTitle]);

  const filteredGames = games.filter(game => game.category.toLowerCase() === category.toLowerCase());

  return (
    <div>
      <h1>Juegos de {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <StatsTables bestSellers={filteredGames} mostPlayed={filteredGames} upcomingTitles={filteredGames} />
    </div>
  );
};

export default CategoryPage;
