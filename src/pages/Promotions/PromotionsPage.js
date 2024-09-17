import React, { useEffect } from 'react';
import Promotions from '../../components/Promotions/Promotions';
import Categories from '../../components/CategoriaJuego/CategoriaJuego';
import GameList from '../../components/GameList/GameList';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título
import PromotionsList from '../../components/PromotionsList/PromotionsList';
import SortedSalesTable from '../../components/Tablas/TablaOrdenada';

const PromotionsPage = () => {
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    setTitle('Promociones'); // Establecer el título de la página
  }, [setTitle]);

  return (
    <div>
      <Promotions />
      <SortedSalesTable />

      <PromotionsList />
    </div>
  );
};

export default PromotionsPage;
