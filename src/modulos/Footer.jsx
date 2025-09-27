import "./Footer.css";

function Footer(){
    return(
        <footer className = "footer">
            <div className="contenido">
                <p>&copy Eat&Rest. Todos los derechos reservados</p>
                <nav className="enlaces">
                    <a href="#sobre_nosotros">Sobre nosotros</a>
                    <a href="#contacto">Contacto</a>
                </nav>
            </div>
        </footer>
    );
}
export default Footer;