import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GamesContext } from '../../context/GameContext';
import './CategoryGames.css';

const normalizeString = (str) => {
  return str
    .normalize('NFD') // Normaliza la cadena para separar los acentos
    .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
    .toLowerCase()
    .trim(); // Convierte a minúsculas y elimina espacios en blanco
};

const CategoryGames = () => {
  const { category } = useParams(); // Obtenemos la categoría desde la URL
  const { games } = useContext(GamesContext);

  // Normalizar la categoría recibida de la URL
  const normalizedCategory = normalizeString(category);

  // Filtrar juegos basados en la categoría normalizada
  const filteredGames = games.filter(game => normalizeString(game.category) === normalizedCategory);

  return (
    <section className="category-games">
      <h2>Juegos en la Categoría: {category}</h2>
      <div className="games-list">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div key={game.id} className="game-card">
              {game.imageUrl ? (
                <img src={game.imageUrl} alt={game.name} className="game-image" />
              ) : (
                <div className="no-image">Imagen no disponible</div>
              )}
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
