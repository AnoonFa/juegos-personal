import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriaJuego.css';

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <section className="categories" id="categorias">
      <h2>Explorar por Categoría</h2>
      <div className="category-cards">
        <div
          className="category-card"
          style={{ backgroundImage: 'url(https://i.ibb.co/gScZFyL/DALL-E-2024-08-25-19-07-55-A-puzzle-game-category-image-featuring-colorful-puzzle-pieces-some-interc.webp)' }}
          onClick={() => handleCategoryClick('Rompecabezas')}
        >
          <h3>Rompecabezas</h3>
        </div>
        <div
          className="category-card"
          style={{ backgroundImage: 'url(https://i.ibb.co/fQMknnj/DALL-E-2024-08-25-19-07-58-A-sports-game-category-image-featuring-dynamic-scenes-from-a-stadium-with.webp)' }}
          onClick={() => handleCategoryClick('Deportes')}
        >
          <h3>Deportes</h3>
        </div>
        <div
          className="category-card"
          style={{ backgroundImage: 'url(https://i.ibb.co/pZ2JsQ4/3a5b6745-a401-4e6e-b5aa-99a02f86ff14.webp)' }}
          onClick={() => handleCategoryClick('Acción')}
        >
          <h3>Acción</h3>
        </div>
      </div>
    </section>
  );
};

export default Categories;
