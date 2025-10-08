import "./Header.css";
import logo from "../assets/Logo/logoEatRest.png";

function Header({ setPagina }) {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Eat&Rest logo" className="logo" />
        <h1 className="titulo">EAT & REST</h1>
      </div>

      <nav className="barra_navegacion">
        <button onClick={() => setPagina("home")}>Inicio</button>
        <button onClick={() => setPagina("restaurante")}>Restaurantes</button>
        <button onClick={() => setPagina("alojamiento")}>Alojamientos</button>
      </nav>
    </header>
  );
}

export default Header;
