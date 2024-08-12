import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Actualizado
import Menu from "../Menu/Menu";
import '../../assets/Styles/menuheader.css'
const Header = () => {
  // Estado del menú
  // `initial`: Indica si el menú ha sido inicialmente cargado.
  // `clicked`: Indica si el menú está abierto o cerrado.
  // `menuName`: Texto que se muestra en el botón del menú.
const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu"
});

  // Estado del botón (habilitado/deshabilitado)
const [disabled, setDisabled] = useState(false);

const location = useLocation();
const navigate = useNavigate();

  // Efecto que se ejecuta cuando el componente se monta
useEffect(() => {
    // Se establece un oyente para los cambios de página.
    // Cuando se navega a una nueva página, se cierra el menú y se restablece el nombre del botón a "Menu".
    setState({ clicked: false, menuName: "Menu" });
}, [location]); // Dependencia: `history`, el efecto se ejecuta cuando `history` cambia.

  // Maneja el estado del menú (abrir/cerrar)
const handleMenu = () => {
    disableMenu(); // Desactiva temporalmente el botón del menú.
    if (state.initial === false) {
      // Si el menú no ha sido inicializado, se abre y se cambia el nombre del botón a "Close".
    setState({
        initial: null,
        clicked: true,
        menuName: "Close"
    });
    } else if (state.clicked === true) {
      // Si el menú está abierto, se cierra y se cambia el nombre del botón a "Menu".
    setState({
        clicked: !state.clicked,
        menuName: "Menu"
    });
    } else if (state.clicked === false) {
      // Si el menú está cerrado, se abre y se cambia el nombre del botón a "Close".
    setState({
        clicked: !state.clicked,
        menuName: "Close"
    });
    }
};

  // Determina si el botón del menú debe ser deshabilitado temporalmente.
const disableMenu = () => {
    setDisabled(!disabled); // Cambia el estado del botón entre habilitado y deshabilitado.
    // Restaura el estado del botón a habilitado después de 1200 ms.
    setTimeout(() => {
    setDisabled(false);
    }, 1200);
};

return (
    <header>
    <div className="container">
        <div className="wrapper">
        <div className="inner-header">
            <div className="logo">
              {/* Enlace a la página principal */}
            <Link to="/">JUEGOS.com</Link>
            </div>
            <div className="menu">
              {/* Botón del menú que cambia su estado al hacer clic */}
            <button disabled={disabled} onClick={handleMenu}>
                {state.menuName}
            </button>
            </div>
        </div>
        </div>
    </div>
      {/* Componente del menú hamburguesa que recibe el estado del menú */}
    <Menu state={state} />
    </header>
    );
};

// Exporta el componente `Header` con la funcionalidad de enrutamiento (history) inyectada.
export default Header;
