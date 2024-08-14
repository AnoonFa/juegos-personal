import React from 'react';
import Slider from 'react-slick';
import './Promotions.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import juego1 from '../../assets/images/calof.png';
import juego2 from '../../assets/images/rompe.png';

const Promotions = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  
  return (
    <div className="promotions">
      <h2>Promociones Actuales</h2>
      <Slider {...settings}>
        <div className="promotion">
          <img src={juego1} alt="Descuento del 20%" />
          <h3>Descuento del 20%</h3>
          <p>Compra al menos 25 licencias de juegos de rompecabezas y obtén un 20% de descuento en tu pedido.</p>
        </div>
        <div className="promotion">
          <img src={juego2} alt="Descuento del 15%" />
          <h3>Descuento del 15%</h3>
          <p>Compra al menos 20 licencias de juegos de deportes y 15 licencias de juegos de acción y obtén un 15% de descuento en tu pedido.</p>
        </div>
      </Slider>
    </div>
  );
};

export default Promotions;
