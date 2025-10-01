import { useState } from 'react'
import './App.css'
import Header from './modulos/Header'
import Footer from './modulos/Footer'
function App() {
  const [pagina, setPagina] = useState("home");

  return (
    <div className="app">
      <Header setPagina={setPagina} />
      <main>
        {pagina === "home" && <h1>Bienvenido a Eat & Rest</h1>}
        {pagina === "restaurantes" && <Restaurantes />}
        {pagina === "alojamientos" && <p>Aquí irán los alojamientos...</p>}
      </main>
      <Footer />
    </div>
  );
}

export default App;
