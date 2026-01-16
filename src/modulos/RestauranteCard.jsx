import React from "react";
import { Link } from "react-router-dom";
import "./RestauranteCard.css";

function RestauranteCard({ restaurante }) {
  if (!restaurante) return null;

  const { id, nombre, tipococina, ciudad } = restaurante;

  return (
    <Link to={`/restaurantes/${id}`} style={{ textDecoration: "none" }}>
      <div className={`card ${ciudad === "Murcia" ? "murcia" : "zaragoza"}`}>
        <h3>{nombre ? nombre : "Sin nombre"}</h3>
        <p className="subtitulo">{tipococina ? tipococina : "Desconocido"}</p>
        {true && <button className="localidad-btn" onClick={(e) => e.preventDefault()}>{ciudad}</button>}
      </div>
    </Link>
  );
}

export default RestauranteCard;
