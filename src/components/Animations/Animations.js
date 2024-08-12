import gsap from "gsap";
import '../../assets/Styles/menuheader.css'


// OPEN MENU
/**
 * Animación para abrir el menú con un efecto de escalonamiento.
 * @param {HTMLElement} node1 - Primer elemento a animar.
 * @param {HTMLElement} node2 - Segundo elemento a animar.
 */
export const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
    duration: 0.8, // Duración de la animación en segundos.
    height: 0, // Comienza con altura 0.
    transformOrigin: "right top", // El punto de origen de la transformación está en la esquina superior derecha.
    skewY: 2, // Aplica una inclinación en el eje Y.
    ease: "power3.inOut", // Tipo de easing para la animación.
    stagger: {
        amount: 0.1 // Intervalo de retardo escalonado entre los elementos.
    }
    });
};


// CLOSE MENU
/**
 * Animación para cerrar el menú con un efecto de escalonamiento.
 * @param {HTMLElement} node1 - Primer elemento a animar.
 * @param {HTMLElement} node2 - Segundo elemento a animar.
 */
export const staggerRevealClose = (node1, node2) => {
    gsap.to([node1, node2], {
      duration: 0.8, // Duración de la animación en segundos.
      height: 0, // El elemento terminará con altura 0.
      ease: "power3.inOut", // Tipo de easing para la animación.
    stagger: {
        amount: 0.07 // Intervalo de retardo escalonado entre los elementos, más corto que en staggerReveal.
    }
    });
};



// STAGGER THE LINKS TO APPEAR
/**
 * Animación para que los enlaces del menú aparezcan con un efecto escalonado.
 * @param {HTMLElement} node1 - Primer enlace a animar.
 * @param {HTMLElement} node2 - Segundo enlace a animar.
 * @param {HTMLElement} node3 - Tercer enlace a animar.
 */
export const staggerText = (node1, node2, node3) => {
    gsap.from([node1, node2, node3], {
      duration: 0.8, // Duración de la animación en segundos.
      y: 100, // Los elementos comienzan desplazados 100 píxeles hacia abajo.
      delay: 0.1, // Retraso de 0.1 segundos antes de que comience la animación.
      ease: "power3.inOut", // Tipo de easing para la animación.
    stagger: {
        amount: 0.3 // Intervalo de retardo escalonado entre los elementos.
    }
    });
};

  // Fade up for the additional info on our menu
/**
   * Animación para que la información adicional en el menú aparezca con un desvanecimiento y desplazamiento hacia arriba.
   * @param {HTMLElement} node - Elemento con la información adicional.
   */
export const fadeInUp = node => {
    gsap.from(node, {
      y: 60, // El elemento comienza desplazado 60 píxeles hacia abajo.
      duration: 1, // Duración de la animación en segundos.
      delay: 0.2, // Retraso de 0.2 segundos antes de que comience la animación.
      opacity: 0, // El elemento comienza con opacidad 0 (invisible).
      ease: "power3.inOut" // Tipo de easing para la animación.
    });
};

  // Hover on the link
/**
   * Animación para los enlaces cuando se pasa el ratón sobre ellos.
   * @param {Event} e - Evento de mouse.
   */
export const handleHover = e => {
    gsap.to(e.target, {
      duration: 0.3, // Duración de la animación en segundos.
      y: 3, // El elemento se mueve 3 píxeles hacia abajo.
      skewX: 4, // Aplica una inclinación en el eje X.
      ease: "power1.inOut" // Tipo de easing para la animación.
    });
};

  // Hover off the link
/**
   * Animación para los enlaces cuando se quita el ratón de encima.
   * @param {Event} e - Evento de mouse.
   */
export const handleHoverExit = e => {
    gsap.to(e.target, {
      duration: 0.3, // Duración de la animación en segundos.
      y: -3, // El elemento se mueve 3 píxeles hacia arriba.
      skewX: 0, // Restaura la inclinación del eje X a 0.
      ease: "power1.inOut" // Tipo de easing para la animación.
    });
};

  // Adds games image once you hover on
/**
   * Añade la imagen del juego cuando se pasa el ratón sobre el elemento.
   * @param {string} game - URL de la imagen de la ciudad.
   * @param {HTMLElement} target - Elemento al que se le aplicará la animación.
   */
export const handleGame = (game, target) => {
    gsap.to(target, {
      duration: 0, // Sin animación para el cambio inmediato del fondo.
      background: `url(${game}) center center` // Cambia el fondo del elemento a la imagen del juego.
    });
    gsap.to(target, {
      duration: 0.4, // Duración de la animación en segundos.
      opacity: 1, // Hace que el elemento sea completamente visible.
      ease: "power3.inOut" // Tipo de easing para la animación.
    });
    gsap.from(target, {
      duration: 0.4, // Duración de la animación en segundos.
      skewY: 2, // Aplica una inclinación en el eje Y.
      transformOrigin: "right top" // El punto de origen de la transformación está en la esquina superior derecha.
    });
};

  // Removes the city image once you hover off
/**
   * Restaura el fondo y la inclinación del elemento cuando se quita el ratón.
   * @param {HTMLElement} target - Elemento al que se le aplicará la animación.
   */
export const handleGameReturn = target => {
    gsap.to(target, {
      duration: 0, // Sin animación para el cambio inmediato de inclinación.
      skewY: 0 // Restaura la inclinación del eje Y a 0.
    });
    gsap.to(target, {
      duration: 0.4, // Duración de la animación en segundos.
      opacity: 0, // Hace que el elemento sea completamente invisible.
      skewY: 0 // Restaura la inclinación del eje Y a 0.
    });
};