import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRestaurantesZaragoza, getRestaurantesMurcia } from "./apiRestaurantes";
import { getTiempoPorCiudad } from "./apiTiempo.js";
import MapaComponent from "./MapaComponent.jsx";
import PronosticoComponent from "./PronosticoComponent.jsx";
import "./DetalleRestaurante.css";

function DetalleRestaurante() {
  const { id } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  const [tiempo, setTiempo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarRestaurante() {
      try {
        setCargando(true);
        const [zaragoza, murcia] = await Promise.all([
          getRestaurantesZaragoza(),
          getRestaurantesMurcia(),
        ]);

        const zaragozaConCiudad = zaragoza.map((r) => ({
          ...r,
          id: `zaragoza-${r.id}`,
          ciudad: "Zaragoza",
        }));

        const murciaConCiudad = murcia.map((r) => ({
          ...r,
          id: `murcia-${r.id}`,
          ciudad: "Murcia",
        }));

        const todos = [...zaragozaConCiudad, ...murciaConCiudad];
        const encontrado = todos.find((r) => r.id === id);

        if (encontrado) {
          setRestaurante(encontrado);
          // Cargar tiempo para la ciudad
          const tiempoData = await getTiempoPorCiudad(encontrado.ciudad);
          setTiempo(tiempoData);
        } else {
          setError("Restaurante no encontrado");
        }
      } catch (err) {
        setError("Error al cargar el restaurante");
      } finally {
        setCargando(false);
      }
    }

    cargarRestaurante();
  }, [id]);

  if (cargando)
    return <div className="detalle-container"><p>Cargando...</p></div>;
  if (error)
    return (
      <div className="detalle-container">
        <p style={{ color: "#e53e3e" }}>{error}</p>
        <Link to="/restaurantes">Volver a restaurantes</Link>
      </div>
    );
  if (!restaurante)
    return (
      <div className="detalle-container">
        <p>Restaurante no encontrado</p>
        <Link to="/restaurantes">Volver a restaurantes</Link>
      </div>
    );

  return (
    <div className="detalle-container">
      <div className="detalle-card">
        <h1>{restaurante.nombre}</h1>
        <div className="detalle-info">
          <div className="info-grupo">
            <label>Tipo de cocina:</label>
            <p>{restaurante.tipococina || "No especificado"}</p>
          </div>
          <div className="info-grupo">
            <label>Ciudad:</label>
            <p>{restaurante.ciudad}</p>
          </div>
          {restaurante.direccion && (
            <div className="info-grupo">
              <label>Dirección:</label>
              <p>{restaurante.direccion}</p>
            </div>
          )}
        </div>
        {tiempo && <PronosticoComponent pronostico={tiempo.pronostico} />}
        <MapaComponent ubicaciones={[restaurante]} />
      </div>
      <Link to="/restaurantes" className="volver-btn">
        ← Volver
      </Link>
    </div>
  );
}

export default DetalleRestaurante;
