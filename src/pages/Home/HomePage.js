import React, { useEffect } from 'react';
import Carousel from '../../components/CarrusePrincipal/CarruselPrincipal';
import Categories from '../../components/CategoriaJuego/CategoriaJuego';
import StatsTables from '../../components/Tablas/Tablas';
import './Home.css';
import GameList from '../../components/GameList/GameList';
import SortedSalesTable from '../../components/Tablas/TablaOrdenada';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título

const Home = () => {
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    setTitle('Inicio'); // Establecer el título de la página
  }, [setTitle]);

  return (
    <div className="home">
      <Carousel />
      <Categories />
      <SortedSalesTable />
      <GameList />
    </div>
  );
};

export default Home;
