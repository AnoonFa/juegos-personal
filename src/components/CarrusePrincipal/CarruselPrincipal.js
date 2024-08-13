import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './CarruselPrincipal.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';  // Estilos para el carrusel

const GameCarousel = () => {
  return (
    <section className="carousel">
      <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
        <div>
          <img src="/images/game1.jpg" alt="Juego 1" />
          <p className="legend">Juego 1</p>
        </div>
        <div>
          <img src="/images/game2.jpg" alt="Juego 2" />
          <p className="legend">Juego 2</p>
        </div>
        <div>
          <img src="/images/game3.jpg" alt="Juego 3" />
          <p className="legend">Juego 3</p>
        </div>
      </Carousel>
    </section>
  );
};

export default GameCarousel;
