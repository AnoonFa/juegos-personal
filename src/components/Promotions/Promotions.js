import React from 'react';
import './Promotions.css';

const Promotions = () => {
  return (
    <div className="promotions">
      <h2>Promociones Actuales</h2>
      <div className="promotion">
        <h3>Descuento del 20%</h3>
        <p>Compra al menos 25 licencias de juegos de rompecabezas y obtén un 20% de descuento en tu pedido.</p>
      </div>
      <div className="promotion">
        <h3>Descuento del 15%</h3>
        <p>Compra al menos 20 licencias de juegos de deportes y 15 licencias de juegos de acción y obtén un 15% de descuento en tu pedido.</p>
      </div>
    </div>
  );
};

export default Promotions;
