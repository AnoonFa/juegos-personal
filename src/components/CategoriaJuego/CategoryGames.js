import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GamesContext } from '../../context/GameContext';
import './CategoryGames.css';
import SearchAndFilterBar from '../SearchAndFilterBar/SearchAndFilterBar'; // Import the search and filter component

const CategoryGames = () => {
  const { category } = useParams(); // Get category from URL params
  const { games, allGames, setGames } = useContext(GamesContext); // Use context to get games and setGames
  const [filteredGames, setFilteredGames] = useState(games); // Store filtered games

  // Function to normalize the category string (for case-insensitive and accent-insensitive comparison)
  const normalizeString = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Filter games based on the selected category
  const filteredByCategory = filteredGames.filter(
    (game) => normalizeString(game.category) === normalizeString(category)
  );

  return (
    <section className="category-games">
      <h2>Juegos en la Categoría: {category}</h2>

     
      <div className="games-list">
         {/* Search and Filter Bar */}
      <SearchAndFilterBar allGames={allGames} setGames={setFilteredGames} />

        {filteredByCategory.length > 0 ? (
          filteredByCategory.map((game) => (
            <Link to={`/game/${game.id}`} key={game.id} className="game-card">
              {/* Ensure the image is rendered correctly */}
              {game.coverImageUrl ? (
                <img src={game.coverImageUrl} alt={game.name} className="game-image" />
              ) : (
                <div className="no-image">Imagen no disponible</div>
              )}
              <h3>{game.name}</h3>
              <p>Tamaño: {game.size} KB</p>
              <p>Precio: ${game.price}</p>
              <p>Licencias Disponibles: {game.licensesAvailable}</p>
            </Link>
          ))
        ) : (
          <p>No hay juegos disponibles en esta categoría.</p>
        )}
      </div>
    </section>
  );
};

export default CategoryGames;
