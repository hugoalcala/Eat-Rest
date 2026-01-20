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
        {true && <button className="localidad-btn" onClick={(e) => e.preventDefault()}>{ciudad}</button>}
      </div>
    </Link>
  );
}

export default RestauranteCard;
