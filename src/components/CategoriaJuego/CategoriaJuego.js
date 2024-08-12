
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriaJuego.css';

const CategoryMenu = () => {
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}`); // Usa navigate para redirigir
  };

  return (
    <div className="category-menu">
      <h2>Explorar por Categoría</h2>
      <div className="category-card" onClick={() => handleCategoryClick('casual')}>
        <img src="/assets/images/casual.jpg" alt="Casual" />
        <h3>Casuales</h3>
      </div>
      <div className="category-card" onClick={() => handleCategoryClick('anime')}>
        <img src="/assets/images/anime.jpg" alt="Anime" />
        <h3>Anime</h3>
      </div>
      <div className="category-card" onClick={() => handleCategoryClick('strategy')}>
        <img src="/assets/images/strategy.jpg" alt="Strategy" />
        <h3>Estrategia</h3>
      </div>
      <div className="category-card" onClick={() => handleCategoryClick('open-world')}>
        <img src="/assets/images/open-world.jpg" alt="Open World" />
        <h3>Mundo Abierto</h3>
      </div>
    </div>
  );
};

export default CategoryMenu;