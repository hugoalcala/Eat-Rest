import { useEffect, useState } from "react";
import { getAlojamientosZaragoza, getAlojamientosMurcia } from "./apiAlojamientos.js";
import AlojamientoCard from "./AlojamientoCard";
import "./Alojamiento.css";


function Alojamientos() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
  const porPagina = 12;

  useEffect(() => {
    async function cargarAlojamientos() {
      try {
        const [zaragoza, murcia] = await Promise.all([
          getAlojamientosZaragoza(),
          getAlojamientosMurcia(),
        ]);
        setAlojamientos([...zaragoza, ...murcia]);
      } catch (err) {
        setError("No se pudieron cargar los alojamientos");
      } finally {
        setCargando(false);
      }
    }
    cargarAlojamientos();
  }, []);

  const alojamientosFiltrados = alojamientos.filter(a =>
    a.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );
  const totalPaginas = Math.ceil(alojamientosFiltrados.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const paginaAlojamientos = alojamientosFiltrados.slice(inicio, fin);

  return (
    <section className="alojamientos-section">
      <h2>Alojamientos</h2>
      <div className="alojamientos-buscador-container">
        <input
          className="alojamientos-buscador"
          type="text"
          placeholder="Buscar alojamiento por nombre..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>
      {cargando ? (
        <p>Cargando alojamientos...</p>
      ) : error ? (
        <p style={{ color: "#e53e3e" }}>{error}</p>
      ) : (
        <>
          <div className="alojamientos-grid">
            {paginaAlojamientos.length === 0 ? (
              <p>No se encontraron alojamientos.</p>
            ) : (
              paginaAlojamientos.map((a, index) => (
                <AlojamientoCard key={a.id || index} alojamiento={a} />
              ))
            )}
          </div>
          {totalPaginas > 1 && (
            <div className="alojamientos-paginacion">
              <button onClick={() => setPagina(p => Math.max(1, p - 1))} disabled={pagina === 1}>&lt; Anterior</button>
              <span>Página {pagina} de {totalPaginas}</span>
              <button onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas}>Siguiente &gt;</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Alojamientos;
