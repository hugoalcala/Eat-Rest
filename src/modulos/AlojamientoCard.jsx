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
          <>
            <div className="tiempo-info">
              <p className="temperatura">{tiempo.temperatura}°C</p>
              <p className="descripcion">{tiempo.descripcion}</p>
            </div>
            {tiempo.pronostico && tiempo.pronostico.slice(1, 3).length > 0 && (
              <div className="pronostico-mini">
                {tiempo.pronostico.slice(1, 3).map((dia, idx) => (
                  <div key={idx} className="dia-mini">
                    <p className="fecha-mini">{dia.fecha}</p>
                    <p className="temp-mini">{dia.tempMax}°</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {localidad && <button className="localidad-btn" onClick={(e) => e.preventDefault()}>{localidad}</button>}
      </div>
    </Link>
  );
}

export default AlojamientoCard;
