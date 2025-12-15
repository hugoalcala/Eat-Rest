
import "./Header.css";
import logo from "../assets/Logo/logoEatRest.png";

function Header({ setPagina }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} alt="Eat&Rest logo" className="logo" />
          <h1 className="titulo">EAT & REST</h1>
        </div>
        <nav className="barra_navegacion">
          <button onClick={() => setPagina("restaurante")}>Restaurantes</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
