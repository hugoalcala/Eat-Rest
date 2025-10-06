import { useState } from 'react'
import './App.css'
import Header from './modulos/Header.jsx'
import Footer from './modulos/Footer.jsx'
import Restaurantes from './modulos/Restaurante.jsx';
import Alojamientos from './modulos/Alojamientos.jsx';
function App() {
  const [pagina, setPagina] = useState("home");

  return (
    <div className="app">
      <Header setPagina={setPagina} />
      <Restaurantes/>
      <main>
        {pagina === "home" && <h1>Bienvenido a Eat & Rest</h1>}
        {pagina === "restaurante" && <Restaurante />}
        {pagina === "alojamientos" && <Alojamientos />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
