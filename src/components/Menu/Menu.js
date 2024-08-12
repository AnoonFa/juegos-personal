import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import '../../assets/Styles/menuheader.css'


import {
    staggerText,
    staggerReveal,
    fadeInUp,
    handleHover,
    handleHoverExit,
    handleGameReturn,
    handleGame,
    staggerRevealClose
} from "../Animations/Animations";

import juego1 from "../../assets/images/rompe.png"; 
import juego2 from "../../assets/images/fifa.png";
import juego3 from "../../assets/images/calof.png";
import juego4 from "../../assets/images/apex.png";

const juegos = [
    { name: "Rompete la Cabeza", image: juego1 },
    { name: "Fafi 24", image: juego2 },
    { name: "Call of", image: juego3 },
    { name: "Alex Leyens", image: juego4 },

];

const Menu = ({ state }) => {
    // Create varibles of our dom nodes
    let menuLayer = useRef(null);
    let reveal1 = useRef(null);
    let reveal2 = useRef(null);
    let cityBackground = useRef(null);
    let line1 = useRef(null);
    let line2 = useRef(null);
    let line3 = useRef(null);
    let info = useRef(null);

useEffect(() => {
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.

    staggerRevealClose(reveal2, reveal1);
      // Set menu to display none
    gsap.to(menuLayer, { duration: 1, css: { display: "none" } });
    } else if (
    state.clicked === true ||
    (state.clicked === true && state.initial === null)
    ) {
      // Set menu to display block
    gsap.to(menuLayer, { duration: 0, css: { display: "block" } });
      //Allow menu to have height of 100%
    gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: "100%"
    });
    staggerReveal(reveal1, reveal2);
    fadeInUp(info);
    staggerText(line1, line2, line3);
    }
}, [state])

return (
    <div ref={el => (menuLayer = el)} className='menu'>
    <div
        ref={el => (reveal1 = el)}
        className='menu-secondary-background-color'></div>
        <div ref={el => (reveal2 = el)} className='menu-layer'>
        <div
        ref={el => (cityBackground = el)}
    className='menu-game-background'></div>
        <div className='container'>
        <div className='wrapper'>
            <div className='menu-links'>
            <nav>
                <ul>
            <li>
                    <Link
                    onMouseEnter={e => handleHover(e)}
                    onMouseOut={e => handleHoverExit(e)}
                    ref={el => (line1 = el)}
                    to='/juegos'>
                    Juegos
                    </Link>
                </li>
                <li>
                    <Link
                    onMouseEnter={e => handleHover(e)}
                    onMouseOut={e => handleHoverExit(e)}
                    ref={el => (line2 = el)}
                    to='/masVendidos'>
                    Los mas vendidos
                    </Link>
                </li>
                <li>
                    <Link
                    onMouseEnter={e => handleHover(e)}
                    onMouseOut={e => handleHoverExit(e)}
                    ref={el => (line3 = el)}
                    to='/compraVende'>
                    Compra y Vende
                    </Link>
                </li>
                </ul>
            </nav>
            <div ref={el => (info = el)} className='info'>
                <h3>¡Aprovecha nuestras promociones exclusivas en licencias de juegos!</h3>
                <h5>¿Estás planeando una compra en volumen? Tenemos ofertas especiales diseñadas para ti:</h5>
                <ol>
                    <strong>Descuento en Juegos de Rompecabezas:</strong><br/> Si solicitas al menos 25 licencias de juegos de rompecabezas, 
                    obtendrás un 20% de descuento sobre el valor total de tu pedido, sin importar la cantidad de 
                    juegos que pidas en otras categorías.
                </ol>
                <ol>
                    <strong >Descuento en Juegos de Rompecabezas:</strong><br/> Si solicitas al menos 25 licencias de juegos de rompecabezas,
                    obtendrás un 20% de descuento sobre el valor total de tu pedido, sin importar la cantidad de juegos que 
                    pidas en otras categorías.
                </ol>
            </div>
            <div className='locations'>
                Locations:
                {juegos.map(el => (
                <span
                    key={el.name}
                    onMouseEnter={() => handleGame(el.image, gameBackground)}
                    onMouseOut={() => handleGameReturn(gameBackground)}>
                    {el.name}
                </span>
                ))}
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
);

};

export default Menu;