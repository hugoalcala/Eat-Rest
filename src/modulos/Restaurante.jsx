


import { useEffect, useState } from "react";
import { getRestaurantesZaragoza, getRestaurantesMurcia } from "./apiRestaurantes";
import "./Restaurante.css";





function Restaurantes() {

  const [restaurantes, setRestaurantes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
  const porPagina = 12;

  useEffect(() => {
    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const [zaragoza, murcia] = await Promise.all([
          getRestaurantesZaragoza(),
          getRestaurantesMurcia(),
        ]);
        // Añadir ciudad solo a restaurantes
        const zaragozaConCiudad = zaragoza.map((r) => ({
          ...r,
          ciudad: "Zaragoza",
        }));
        const murciaConCiudad = murcia.map((r) => ({
          ...r,
          ciudad: "Murcia",
        }));
        setRestaurantes([...zaragozaConCiudad, ...murciaConCiudad]);
      } catch (err) {
        setError("No se pudieron cargar los restaurantes");
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);


  const restaurantesFiltrados = restaurantes
    .filter(r =>
      !r.nombre.toLowerCase().includes("hotel") &&
      r.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

  // Paginación
  const totalPaginas = Math.ceil(restaurantesFiltrados.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const paginaRestaurantes = restaurantesFiltrados.slice(inicio, fin);

  return (
    <section className="restaurantes">
      <header className="restaurantes-header">
        <div className="restaurantes-icon-title">
          <span className="restaurantes-icon" role="img" aria-label="Restaurantes">
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="27" cy="27" r="27" fill="#f7f7fa"/>
              <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" fontSize="2.2rem">🍽️</text>
            </svg>
          </span>
          <h2 className="restaurantes-title">Restaurantes</h2>
        </div>
        <p className="restaurantes-subtitle">
          Descubre los mejores lugares para comer. ¡Explora y encuentra tu próximo favorito!
        </p>
        <input
          className="restaurantes-buscador"
          type="text"
          placeholder="Buscar restaurante por nombre..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </header>
      {cargando ? (
        <p>Cargando restaurantes...</p>
      ) : error ? (
        <p style={{ color: "#e53e3e" }}>{error}</p>
      ) : (
        <>
          <div className="restaurantes-grid">
            {paginaRestaurantes.length === 0 ? (
              <p>No se encontraron restaurantes.</p>
            ) : (
              paginaRestaurantes.map((r) => (
                <div className={`restaurante-card card-${r.ciudad.toLowerCase()}`} key={r.id}>
                  <div className="restaurante-info">
                    <h3>{r.nombre}</h3>
                    <p className="restaurante-tipo">{r.tipococina}</p>
                    <span className={`restaurante-ciudad ciudad-${r.ciudad.toLowerCase()}`}>{r.ciudad}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          {totalPaginas > 1 && (
            <div className="restaurantes-paginacion">
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

export default Restaurantes;
