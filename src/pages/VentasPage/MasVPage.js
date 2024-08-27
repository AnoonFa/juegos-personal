import React, { useEffect } from 'react';
import Promotions from '../../components/Promotions/Promotions';
import StatsTables from '../../components/Tablas/Tablas';
import GameList from '../../components/GameList/GameList';
import SortedSalesTable from '../../components/Tablas/TablaOrdenada';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título
import '../Home/Home.css';
import GameReviews from '../../components/GameReviews/GameReviews';

const MasVPage = () => {
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    setTitle('Más Vendidos'); // Establecer el título de la página
  }, [setTitle]);

  return (
    <div className="home">
      <Promotions />
      <SortedSalesTable />
      <StatsTables />
      <GameList />
      <GameReviews/>
    </div>
  );
};

export default MasVPage;
