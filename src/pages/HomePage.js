import React from 'react';
import Carousel from '../components/CarrusePrincipal/CarruselPrincipal';
import Categories from '../components/CategoriaJuego/CategoriaJuego';
import StatsTables from '../components/Tablas/Tablas';
import './Home.css';

const Home = () => (
  <div className="home">
    <Carousel />
    <Categories />
    <StatsTables />
  </div>
);

export default Home;
