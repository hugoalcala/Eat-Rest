import "./Header.css";
import logo from "../assets/Logo/logoEatRest.png"
function Header(){
    return(
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Eat&Rest logo" className="logo"></img>
                <h1 className="titulo">EAT & REST</h1>
            </div>
            <nav className="barra_navegación">
                <button onClick={() =>setPagina("home")}>Inicio</button>
                <button onClick={() =>setPagina("restaurantes")}>Restaurantes</button>
                <button onClick={() =>setPagina("alojamientos")}>Alojamientos</button>
            </nav>
        </header>
    );
}
export default Header