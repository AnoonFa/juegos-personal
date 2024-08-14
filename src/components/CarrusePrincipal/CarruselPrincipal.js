import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './CarruselPrincipal.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';  // Estilos para el carrusel

import juego1 from '../../assets/images/calof.png';
import juego2 from '../../assets/images/rompe.png';
import juego3 from '../../assets/images/apex.png';
import juego4 from '../../assets/images/fifa.png';


const GameCarousel = () => {
  return (
    <section className="carousel">
      <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
        <div>
          <img src={juego1} alt="Juego 1" />
          <p className="legend">Call of Gruty</p>
        </div>
        <div>
          <img src={juego2} alt="Juego 2" />
          <p className="legend">Puzzle Master</p>
        </div>
        <div>
          <img src={juego3} alt="Juego 3" />
          <p className="legend">Action Hero</p>
        </div>
        <div>
          <img src={juego4} alt="Juego 3" />
          <p className="legend">Sports Mania</p>
        </div>
      </Carousel>
    </section>
  );
};

export default GameCarousel;
