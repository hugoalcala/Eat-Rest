import React from "react";
import "./AlojamientoCard.css";

function AlojamientoCard({ alojamiento }) {
  if (!alojamiento) return null;

  const { title, streetAddress, postalCode, addressLocality, telefonos, categoria, link } = alojamiento;

  return (
    <div className="card">
      <h3>{title || "Alojamiento sin nombre"}</h3>
      <p>{categoria || "Categoría desconocida"}</p>
      <p>{streetAddress && `${streetAddress}, ${postalCode || ""}`}</p>
      <p>{addressLocality}</p>
      {telefonos && <p> {telefonos}</p>}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          Ver más detalles
        </a>
      )}
    </div>
  );
}

export default AlojamientoCard;
