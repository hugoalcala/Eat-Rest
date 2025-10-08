import { useEffect, useState } from "react";
import { getRestaurantesZaragoza, getRestaurantesMurcia } from "./apiRestaurantes.js";
import RestauranteCard from "./RestauranteCard";
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
    <section className="restaurantes">
      <h2>Restaurantes</h2>
      {restaurantes.length === 0 ? (
        <p>No hay restaurantes disponibles.</p>
      ) : (
        <div className="grid">
          {restaurantes.map((r, index) => (
            <RestauranteCard key={r.id || index} restaurante={r} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Restaurantes;
