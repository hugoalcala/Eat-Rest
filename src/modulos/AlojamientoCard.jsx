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
    <div className="alojamiento-card">
      <h3>{nombre || "Alojamiento sin nombre"}</h3>
      {categoria && <p className="alojamiento-categoria">{categoria}</p>}
      {direccion && <p className="alojamiento-direccion">{direccion}</p>}
      {localidad && <p className="alojamiento-localidad">{localidad}</p>}
      {descripcion && (
        <p className="descripcion" style={{wordBreak: 'break-word'}} dangerouslySetInnerHTML={{ __html: descripcion }} />
      )}
      {link && (
        <a className="ver-mas" href={link} target="_blank" rel="noopener noreferrer">
          Ver más detalles
        </a>
      )}
    </div>
  );
}

export default AlojamientoCard;
