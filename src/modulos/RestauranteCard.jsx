import React from "react";
import "./RestauranteCard.css";

function RestauranteCard({ restaurante }) {
  if (!restaurante) return null;

  const { nombre, tipococina, lat, lng, direccion } = restaurante;

  return (
    <div className="card">
      <h3>{nombre ? nombre : "Sin nombre"}</h3>
      <p className="subtitulo">{tipococina ? tipococina : "Desconocido"}</p>
      {true && <button className="localidad-btn">Zaragoza</button>}
    </div>
  );
}

export default RestauranteCard;
