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
      <p>{categoria ? categoria : "Categoría no especificada"}</p>
      {direccion && <p>{direccion}</p>}
      {localidad && <p>{localidad}</p>}
      {descripcion && (
        <p className="descripcion" style={{wordBreak: 'break-word'}} dangerouslySetInnerHTML={{ __html: descripcion }} />
      )}
    </div>
  );
}

export default AlojamientoCard;
