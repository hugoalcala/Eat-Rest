import React from "react";
import { Link } from "react-router-dom";
import "./AlojamientoCard.css";



function AlojamientoCard({ alojamiento }) {
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
        <p className="subtitulo">{categoria ? categoria : "No especificada"}</p>
        {localidad && <button className="localidad-btn" onClick={(e) => e.preventDefault()}>{localidad}</button>}
      </div>
    </Link>
  );
}

export default AlojamientoCard;
