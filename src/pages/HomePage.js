import React from 'react';
import Carousel from '../components/CarrusePrincipal/CarruselPrincipal';
import GameTables from '../components/Tablas/Tablas';
import { bestSellers, mostPlayed, upcomingTitles } from '../data'; // Asegúrate de definir los datos en un archivo de datos

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenido a la AppStore de Juegos</h1>
      <GameTables
        bestSellers={bestSellers}
        mostPlayed={mostPlayed}
        upcomingTitles={upcomingTitles}
      />
    </div>
  );
};

export default HomePage;
