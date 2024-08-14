import React from 'react';
import Carousel from '../components/CarrusePrincipal/CarruselPrincipal';
import Categories from '../components/CategoriaJuego/CategoriaJuego';
import StatsTables from '../components/Tablas/Tablas';
import './Home.css';
import GameList from '../components/GameList/GameList';
import SortedSalesTable from '../components/Tablas/TablaOrdenada';

const Home = () => (
  <div className="home">
    <Carousel />
    <Categories />
    <StatsTables />
    <SortedSalesTable />
    <GameList />
  </div>
);

export default Home;
