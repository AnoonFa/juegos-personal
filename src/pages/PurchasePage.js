import React from 'react';
import PurchaseScreen from '../components/PurchaseScreen/PurchaseScreen';

const game = {
  image: '/assets/images/game.jpg',
  title: 'Juego Ejemplo',
  developer: 'Desarrollador Ejemplo',
  originalPrice: 50,
  discount: 10,
  finalPrice: 45,
  tax: 4.5,
  rewards: '5 puntos de recompensa',
};

const PurchasePage = () => {
  const handleClose = () => {
    console.log('Compra cerrada');
  };

  return (
    <div>
      <PurchaseScreen game={game} onClose={handleClose} />
    </div>
  );
};

export default PurchasePage;
