

import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/Logo/logoEatRest.png";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/restaurantes" style={{ textDecoration: "none" }}>
          <div className="logo-container">
            <img src={logo} alt="Eat&Rest logo" className="logo" />
            <h1 className="titulo">EAT & REST</h1>
          </div>
        </Link>
        <nav className="barra_navegacion">
          <Link to="/restaurantes" className="nav-link">
            Restaurantes
          </Link>
          <Link to="/alojamientos" className="nav-link">
            Alojamientos
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
