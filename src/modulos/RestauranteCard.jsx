import React from "react";
import "./RestauranteCard.css";

function RestauranteCard({ restaurante }) {
  if (!restaurante) return null;

  const { nombre, tipococina, lat, lng, direccion } = restaurante;

  return (
    <div className="card">
      <h3>{nombre ? nombre : "Sin nombre"}</h3>
      <p>{tipococina ? tipococina : "Tipo de cocina no especificado"}</p>
      {direccion && <p>{direccion}</p>}

      {lat && lng ? (
        <p>
          {Number(lat).toFixed(4)}, {Number(lng).toFixed(4)}
        </p>
      ) : (
        <p>Ubicación no disponible</p>
      )}
    </div>
  );
}

export default RestauranteCard;
