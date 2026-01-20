import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTiempoPorCiudad } from "./apiTiempo.js";
import "./AlojamientoCard.css";

function AlojamientoCard({ alojamiento }) {
  const [tiempo, setTiempo] = useState(null);

  useEffect(() => {
    if (alojamiento?.localidad) {
      getTiempoPorCiudad(alojamiento.localidad).then(setTiempo);
    }
  }, [alojamiento?.localidad]);

  if (!alojamiento) return null;

  const {
    id,
    nombre,
    descripcion,
    direccion,
    localidad,
    categoria,
    link
  } = alojamiento;

  return (
    <Link to={`/alojamientos/${id}`} style={{ textDecoration: "none" }}>
      <div className={`card ${localidad === "Murcia" ? "murcia" : "zaragoza"}`}>
        <h3>{nombre || "Alojamiento sin nombre"}</h3>
        {tiempo && (
          <div className="tiempo-info">
            <p className="temperatura">{tiempo.temperatura}°C</p>
            <p className="descripcion">{tiempo.descripcion}</p>
          </div>
        )}
        {localidad && <button className="localidad-btn" onClick={(e) => e.preventDefault()}>{localidad}</button>}
      </div>
    </Link>
  );
}

export default AlojamientoCard;
