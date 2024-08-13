import React from 'react';
import './CategoriaJuego.css';

const Categories = () => (
  <section className="categories" id="categorias">
    <h2>Explorar por Categoría</h2>
    <div className="category-cards">
      <div className="category-card" style={{backgroundColor: 'red'}}>
        <h3>Rompecabezas</h3>
      </div>
      <div className="category-card" style={{backgroundColor: 'blue'}}>
        <h3>Deportes</h3>
      </div>
      <div className="category-card" style={{backgroundColor: 'green'}}>
        <h3>Acción</h3>
      </div>
    </div>
  </section>
);

export default Categories;