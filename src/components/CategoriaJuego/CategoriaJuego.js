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
          style={{backgroundColor: 'red'}}
          onClick={() => handleCategoryClick('rompecabezas')}
        >
          <h3>Rompecabezas</h3>
        </div>
        <div
          className="category-card"
          style={{backgroundColor: 'blue'}}
          onClick={() => handleCategoryClick('deportes')}
        >
          <h3>Deportes</h3>
        </div>
        <div
          className="category-card"
          style={{backgroundColor: 'green'}}
          onClick={() => handleCategoryClick('accion')}
        >
          <h3>Acción</h3>
        </div>
      </div>
    </section>
  );
};

export default Categories;