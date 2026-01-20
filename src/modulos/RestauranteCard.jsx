import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTiempoPorCiudad } from "./apiTiempo.js";
import "./RestauranteCard.css";

function RestauranteCard({ restaurante }) {
  const [tiempo, setTiempo] = useState(null);

  useEffect(() => {
    if (restaurante?.ciudad) {
      getTiempoPorCiudad(restaurante.ciudad).then(setTiempo);
    }
  }, [restaurante?.ciudad]);

  if (!restaurante) return null;

  const { id, nombre, tipococina, ciudad } = restaurante;

  return (
    <Link to={`/restaurantes/${id}`} style={{ textDecoration: "none" }}>
      <div className={`card ${ciudad === "Murcia" ? "murcia" : "zaragoza"}`}>
        <h3>{nombre ? nombre : "Sin nombre"}</h3>
        {tiempo && (
          <div className="tiempo-info">
            <p className="temperatura">{tiempo.temperatura}°C</p>
            <p className="descripcion">{tiempo.descripcion}</p>
          </div>
        )}
        {true && <button className="localidad-btn" onClick={(e) => e.preventDefault()}>{ciudad}</button>}
      </div>
    </Link>
  );
}

export default RestauranteCard;
