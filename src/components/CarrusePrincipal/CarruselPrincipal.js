import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './CarruselPrincipal.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';  // Estilos para el carrusel

import juego1 from '../../assets/images/accion.webp';
import juego2 from '../../assets/images/fubol.webp';
import juego3 from '../../assets/images/rompe.webp';
import juego4 from '../../assets/images/fubol.webp';

const GameCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const juegos = [
    { src: juego1, alt: "Juego 1", legend: "Juega" },
    { src: juego2, alt: "Juego 2", legend: "Compra" },
    { src: juego3, alt: "Juego 3", legend: "Vende" },
    { src: juego4, alt: "Juego 4", legend: "Colabora" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % juegos.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [juegos.length]);

  return (
    <div className="carousel-container">
      <section className="carousel">
        <Carousel 
          showArrows={true} 
          autoPlay={false} 
          infiniteLoop={true}
          selectedItem={activeIndex}
          onChange={index => setActiveIndex(index)}
          showThumbs={false}
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
          <div key={index} className={`thumbnail-item ${index === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(index)}>
            <div className="progress-bg">
              <img src={juego.src} alt={juego.alt} />
              <span>{juego.legend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCarousel;
