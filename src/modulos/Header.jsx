

import "./Header.css";
import logo from "../assets/Logo/logoEatRest.png";

function Header({ setPagina, paginaActual }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} alt="Eat&Rest logo" className="logo" />
          <h1 className="titulo">EAT & REST</h1>
        </div>
        <nav className="barra_navegacion">
          <button
            className={paginaActual === "restaurante" ? "nav-activo" : ""}
            onClick={() => setPagina("restaurante")}
          >
            Restaurantes
          </button>
          <button
            className={paginaActual === "alojamiento" ? "nav-activo" : ""}
            onClick={() => setPagina("alojamiento")}
          >
            Alojamientos
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
