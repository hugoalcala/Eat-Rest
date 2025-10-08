import { useEffect, useState } from "react";
import { getAlojamientosZaragoza, getAlojamientosMurcia } from "./apiAlojamientos.js";
import AlojamientoCard from "./AlojamientoCard";
import "./Alojamiento.css";

function Alojamientos() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarAlojamientos() {
      try {
        const [zaragoza, murcia] = await Promise.all([
          getAlojamientosZaragoza(),
          getAlojamientosMurcia(),
        ]);

        setAlojamientos([...zaragoza, ...murcia]);
      } catch (err) {
        console.error("Error cargando alojamientos:", err);
        setError("No se pudieron cargar los alojamientos");
      } finally {
        setCargando(false);
      }
    }

    cargarAlojamientos();
  }, []);

  if (cargando) return <p>Cargando alojamientos...</p>; 
  if (error) return <p>{error}</p>;

  return (
    <section className="alojamientos">
      <h2>Alojamientos</h2>
      {alojamientos.length === 0 ? (
        <p>No hay alojamientos disponibles.</p>
      ) : (
        <div className="grid">
          {alojamientos.map((a, index) => (
            <AlojamientoCard key={a.id || index} alojamiento={a} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Alojamientos;
