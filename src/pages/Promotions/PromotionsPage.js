import React, { useEffect } from 'react';
import Promotions from '../../components/Promotions/Promotions';
import Categories from '../../components/CategoriaJuego/CategoriaJuego';
import GameList from '../../components/GameList/GameList';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título

const PromotionsPage = () => {
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    setTitle('Promociones'); // Establecer el título de la página
  }, [setTitle]);

  return (
    <div>
      <Promotions />
      <Categories />
      <GameList />
    </div>
  );
};

export default PromotionsPage;
