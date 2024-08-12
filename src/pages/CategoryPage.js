import React from 'react';
import { useParams } from 'react-router-dom';
import GameTables from '../components/Tablas/Tablas';
import { games } from '../data'; // Asegúrate de definir los datos en un archivo de datos

const CategoryPage = () => {
  const { category } = useParams();

  // Filtra los juegos según la categoría
  const filteredGames = games.filter(game => game.category === category);

  return (
    <div>
      <h1>Juegos de {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <GameTables
        bestSellers={filteredGames} // Utiliza los juegos filtrados
        mostPlayed={filteredGames}
        upcomingTitles={filteredGames}
      />
    </div>
  );
};

export default CategoryPage;
