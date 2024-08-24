import React from 'react';
import Carousel from '../../components/CarrusePrincipal/CarruselPrincipal';
import Categories from '../../components/CategoriaJuego/CategoriaJuego';
import StatsTables from '../../components/Tablas/Tablas';
import './SalesPage.css';
import GameList from '../../components/GameList/GameList';
import Promotions from '../../components/Promotions/Promotions';
import Sales from '../../components/Sales/Sales';

const SalesPage = () => (
  <div className="home">
    <Promotions />
    <StatsTables />
    <GameList />
   {UserActivation.role ==='administrador'&&( <Sales/>)}
  </div>
);

export default SalesPage;