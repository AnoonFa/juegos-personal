import React, { useState, useEffect } from 'react';
import './CarruselPrincipal.css';

// Datos de juegos (deberías cargar estos datos desde un archivo o API)
const juegos = [
  {
    id: 1,
    name: 'Rompete la Cabeza',
    images: ['/assets/images/rompete1.jpg', '/assets/images/rompete2.jpg', '/assets/images/rompete3.jpg', '/assets/images/rompete4.jpg', '/assets/images/rompete5.jpg'],
  },
  {
    id: 2,
    name: 'Fafi2024',
    images: ['/assets/images/fafi1.jpg', '/assets/images/fafi2.jpg', '/assets/images/fafi3.jpg', '/assets/images/fafi4.jpg', '/assets/images/fafi5.jpg'],
  },
  {
    id: 3,
    name: 'Call of Gruty',
    images: ['/assets/images/callofgruty1.jpg', '/assets/images/callofgruty2.jpg', '/assets/images/callofgruty3.jpg', '/assets/images/callofgruty4.jpg', '/assets/images/callofgruty5.jpg'],
  },
  {
    id: 4,
    name: 'Alex Leyens',
    images: ['/assets/images/alexleyens1.jpg', '/assets/images/alexleyens2.jpg', '/assets/images/alexleyens3.jpg', '/assets/images/alexleyens4.jpg', '/assets/images/alexleyens5.jpg'],
  },
];

const Carrusel = () => {
  const [currentJuegoIndex, setCurrentJuegoIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 5);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 5);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 5) % 5);
  };

  const juego = juegos[currentJuegoIndex];

  return (
    <div className="carrusel">
      <img src={juego.images[currentImageIndex]} alt={juego.name} className="main-image" />
      <div className="miniaturas">
        {juego.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index}`}
            className={`miniatura ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
      <div className="nav-buttons">
        <button onClick={handlePrev} className="nav-button">◀</button>
        <button onClick={handleNext} className="nav-button">▶</button>
      </div>
      <div className="indicadores">
        {juego.images.map((_, index) => (
          <span key={index} className={`indicador ${index === currentImageIndex ? 'active' : ''}`}></span>
        ))}
      </div>
    </div>
  );
};

export default Carrusel;