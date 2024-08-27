import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './CarruselPrincipal.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';  // Estilos para el carrusel

import juego1 from '../../assets/images/calof.png';
import juego2 from '../../assets/images/rompe.png';
import juego3 from '../../assets/images/apex.png';
import juego4 from '../../assets/images/fifa.png';

const GameCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const juegos = [
    { src: juego1, alt: "Juego 1", legend: "Call of Gruty" },
    { src: juego2, alt: "Juego 2", legend: "Puzzle Master" },
    { src: juego3, alt: "Juego 3", legend: "Action Hero" },
    { src: juego4, alt: "Juego 4", legend: "Sports Mania" },
  ];

  return (
    <div className="carousel-container">
      <section className="carousel">
        <Carousel 
          showArrows={true} 
          autoPlay={true} 
          infiniteLoop={true}
          selectedItem={activeIndex}
          onChange={index => setActiveIndex(index)}
        >
          {juegos.map((juego, index) => (
            <div key={index}>
              <img src={juego.src} alt={juego.alt} />
              <p className="legend">{juego.legend}</p>
            </div>
          ))}
        </Carousel>
      </section>

      <div className="carousel-thumbnails">
        {juegos.map((juego, index) => (
          <img
            key={index}
            src={juego.src}
            alt={juego.alt}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameCarousel;
