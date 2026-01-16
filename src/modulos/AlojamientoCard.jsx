import React from "react";
import "./AlojamientoCard.css";



function AlojamientoCard({ alojamiento }) {
  if (!alojamiento) return null;

  const {
    nombre,
    descripcion,
    direccion,
    localidad,
    categoria,
    link
  } = alojamiento;

  return (
    <div className={`card ${localidad === "Murcia" ? "murcia" : "zaragoza"}`}>
      <h3>{nombre || "Alojamiento sin nombre"}</h3>
      <p className="subtitulo">{categoria ? categoria : "No especificada"}</p>
      {localidad && <button className="localidad-btn">{localidad}</button>}
    </div>
  );
}

export default AlojamientoCard;
