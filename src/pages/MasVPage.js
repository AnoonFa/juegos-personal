import React from 'react';
import Carousel from '../components/CarrusePrincipal/CarruselPrincipal';
import Categories from '../components/CategoriaJuego/CategoriaJuego';
import StatsTables from '../components/Tablas/Tablas';
import './Home.css';
import GameList from '../components/GameList/GameList';
import SortedSalesTable from '../components/Tablas/TablaOrdenada';
import Promotions from '../components/Promotions/Promotions';

const MasVPage = () => (
  <div className="home">
    <Promotions />
    <SortedSalesTable />
    <StatsTables />
    <GameList />
  </div>
);

export default MasVPage;
