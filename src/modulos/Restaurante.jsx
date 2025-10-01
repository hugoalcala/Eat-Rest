import { useEffect, useState } from "react";
import { getRestaurantesZaragoza, getRestaurantesMurcia } from "./api.js";
import "./Restaurante.css";

function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const [zaragoza, murcia] = await Promise.all([
          getRestaurantesZaragoza(),
          getRestaurantesMurcia(),
        ]);

        // Juntamos todos los restaurantes
        setRestaurantes([...zaragoza, ...murcia]);
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudieron cargar los restaurantes");
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, []);

  if (cargando) return <p>Cargando restaurantes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Restaurantes</h2>
      {restaurantes.length === 0 ? (
        <p>No hay restaurantes disponibles.</p>
      ) : (
        <div className="grid">
          {restaurantes.map((r) => (
            <div key={r.id} className="card">
              <h3>{r.nombre}</h3>
              <p>{r.tipococina}</p>
              {r.lat && r.lng && (
                <p>Ubicación: {r.lat.toFixed(3)}, {r.lng.toFixed(3)}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Restaurantes;
