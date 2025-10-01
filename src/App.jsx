import { useState } from 'react'
import './App.css'
import Header from './modulos/Header'
import Footer from './modulos/Footer'
import Restaurantes from './modulos/Restaurante';
function App() {
  const [pagina, setPagina] = useState("home");

  return (
    <div className="app">
      <Header setPagina={setPagina} />
      <Restaurantes/>
      <main>
        {pagina === "home" && <h1>Bienvenido a Eat & Rest</h1>}
        {pagina === "restaurante" && <Restaurante />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
