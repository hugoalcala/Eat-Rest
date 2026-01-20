import React from "react";
import "./PronosticoComponent.css";

function PronosticoComponent({ pronostico }) {
  if (!pronostico || pronostico.length === 0) {
    return null;
  }

  return (
    <div className="pronostico-container">
      <h3>Pronóstico de 7 días</h3>
      <div className="pronostico-grid">
        {pronostico.map((dia, idx) => (
          <div key={idx} className="dia-pronostico">
            <p className="fecha">{dia.fecha}</p>
            <p className="descripcion">{dia.descripcion}</p>
            <div className="temperaturas">
              <span className="temp-max">Max: {dia.tempMax}°</span>
              <span className="temp-min">Min: {dia.tempMin}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PronosticoComponent;
