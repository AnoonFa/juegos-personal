import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GamesContext } from '../../context/GameContext';
import './CategoryGames.css';

const CategoryGames = () => {
  const { category } = useParams(); // Obtenemos la categoría desde la URL
  const { games } = useContext(GamesContext);

  const filteredGames = games.filter(game => game.category === category);

  return (
    <section className="category-games">
      <h2>Juegos en la Categoría: {category}</h2>
      <div className="games-list">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div key={game.id} className="game-card">
              <img src={game.image} alt={game.name} />
              <h3>{game.name}</h3>
              <p>Tamaño: {game.size} KB</p>
              <p>Precio: ${game.price}</p>
              <p>Licencias Disponibles: {game.licensesAvailable}</p>
            </div>
          ))
        ) : (
          <p>No hay juegos disponibles en esta categoría.</p>
        )}
      </div>
    </section>
  );
};

export default CategoryGames;
