import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlojamientosZaragoza, getAlojamientosMurcia } from "./apiAlojamientos.js";
import "./DetalleAlojamiento.css";

function DetalleAlojamiento() {
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarAlojamiento() {
      try {
        setCargando(true);
        const [zaragoza, murcia] = await Promise.all([
          getAlojamientosZaragoza(),
          getAlojamientosMurcia(),
        ]);

        const todos = [...zaragoza, ...murcia];
        const encontrado = todos.find((a) => a.id === id);

        if (encontrado) {
          setAlojamiento(encontrado);
        } else {
          setError("Alojamiento no encontrado");
        }
      } catch (err) {
        setError("Error al cargar el alojamiento");
      } finally {
        setCargando(false);
      }
    }

    cargarAlojamiento();
  }, [id]);

  if (cargando)
    return <div className="detalle-container"><p>Cargando...</p></div>;
  if (error)
    return (
      <div className="detalle-container">
        <p style={{ color: "#e53e3e" }}>{error}</p>
        <Link to="/alojamientos">Volver a alojamientos</Link>
      </div>
    );
  if (!alojamiento)
    return (
      <div className="detalle-container">
        <p>Alojamiento no encontrado</p>
        <Link to="/alojamientos">Volver a alojamientos</Link>
      </div>
    );

  return (
    <div className="detalle-container">
      <div className={`detalle-card ${alojamiento.localidad === "Murcia" ? "murcia" : "zaragoza"}`}>
        <h1>{alojamiento.nombre}</h1>
        <div className="detalle-info">
          <div className="info-grupo">
            <label>Categoría:</label>
            <p>{alojamiento.categoria || "No especificada"}</p>
          </div>
          <div className="info-grupo">
            <label>Ciudad:</label>
            <p>{alojamiento.localidad}</p>
          </div>
          {alojamiento.direccion && (
            <div className="info-grupo">
              <label>Dirección:</label>
              <p>{alojamiento.direccion}</p>
            </div>
          )}
          {alojamiento.descripcion && (
            <div className="info-grupo">
              <label>Descripción:</label>
              <p dangerouslySetInnerHTML={{ __html: alojamiento.descripcion }} />
            </div>
          )}
          {alojamiento.lat && alojamiento.lng && (
            <div className="info-grupo">
              <label>Coordenadas:</label>
              <p>
                {Number(alojamiento.lat).toFixed(4)}, {Number(alojamiento.lng).toFixed(4)}
              </p>
            </div>
          )}
        </div>
        {alojamiento.link && (
          <a href={alojamiento.link} target="_blank" rel="noopener noreferrer" className="enlace-btn">
            Ver más información
          </a>
        )}
        <Link to="/alojamientos" className="volver-btn">
          ← Volver
        </Link>
      </div>
    </div>
  );
}

export default DetalleAlojamiento;
