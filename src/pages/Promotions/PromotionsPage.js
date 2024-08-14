import React from 'react';
import Promotions from '../../components/Promotions/Promotions';
import Categories from '../../components/CategoriaJuego/CategoriaJuego';
import GameList from '../../components/GameList/GameList';

const PromotionsPage = () => {
  return (
    <div>
      <Promotions />
      <Categories/>
      <GameList />
    </div>
  );
};

export default PromotionsPage;
