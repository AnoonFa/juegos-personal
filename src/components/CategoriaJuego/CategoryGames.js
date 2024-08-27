import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importa Link
import { GamesContext } from '../../context/GameContext';
import './CategoryGames.css';

const CategoryGames = () => {
  const { category } = useParams(); // Obtenemos la categoría desde la URL
  const { games } = useContext(GamesContext);

  // Función para normalizar la cadena, eliminando acentos y convirtiendo a minúsculas
  const normalizeString = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Filtrar juegos basados en la categoría, insensible a mayúsculas y acentos
  const filteredGames = games.filter(game => normalizeString(game.category) === normalizeString(category));

  return (
    <section className="category-games">
      <h2>Juegos en la Categoría: {category}</h2>
      <div className="games-list">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <Link to={`/game/${game.id}`} key={game.id} className="game-card">
              {game.imageUrl ? (
                <img src={game.imageUrl} alt={game.name} className="game-image" />
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
