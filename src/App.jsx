import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./modulos/Header";
import Footer from "./modulos/Footer";
import Restaurantes from "./modulos/Restaurante";
import Alojamientos from "./modulos/Alojamientos";
import DetalleRestaurante from "./modulos/DetalleRestaurante";
import DetalleAlojamiento from "./modulos/DetalleAlojamiento";


function App() {
  const [pagina, setPagina] = useState("restaurante");

  return (
    <Router>
      <div className="app">
        <Header setPagina={setPagina} paginaActual={pagina} />

        <main>
          <Routes>
            <Route path="/" element={<Restaurantes />} />
            <Route path="/restaurantes" element={<Restaurantes />} />
            <Route path="/restaurantes/:id" element={<DetalleRestaurante />} />
            <Route path="/alojamientos" element={<Alojamientos />} />
            <Route path="/alojamientos/:id" element={<DetalleAlojamiento />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
