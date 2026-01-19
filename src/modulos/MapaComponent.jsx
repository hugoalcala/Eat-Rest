import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./MapaComponent.css";

// Icono personalizado para los marcadores
const icono = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapaComponent({ ubicaciones, centroDefault = [40.4168, -3.7038] }) {
  // Validar que tengamos ubicaciones con coordenadas válidas
  const ubicacionesValidas = ubicaciones.filter((u) => {
    const lat = parseFloat(u.lat);
    const lng = parseFloat(u.lng);
    // Verificar que sean números válidos
    if (isNaN(lat) || isNaN(lng)) return false;
    // Verificar que estén en España aproximadamente (lat 35-44, lng -10 a 4)
    return lat >= 35 && lat <= 44 && lng >= -10 && lng <= 4;
  });

  // Si tenemos ubicaciones, calcular el centro como promedio
  const centro =
    ubicacionesValidas.length > 0
      ? [
          ubicacionesValidas.reduce((sum, u) => sum + parseFloat(u.lat), 0) /
            ubicacionesValidas.length,
          ubicacionesValidas.reduce((sum, u) => sum + parseFloat(u.lng), 0) /
            ubicacionesValidas.length,
        ]
      : centroDefault;

  return (
    <div className="mapa-contenedor">
      {ubicacionesValidas.length === 0 ? (
        <p className="sin-coordenadas">
          No se encuentran coordenadas válidas disponibles para mostrar en el mapa
        </p>
      ) : (
        <MapContainer
          center={centro}
          zoom={13}
          scrollWheelZoom={false}
          className="mapa"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {ubicacionesValidas.map((ubicacion, idx) => (
            <Marker
              key={idx}
              position={[parseFloat(ubicacion.lat), parseFloat(ubicacion.lng)]}
              icon={icono}
            >
              <Popup>
                <div className="popup-contenido">
                  <h4>{ubicacion.nombre}</h4>
                  {ubicacion.direccion && <p>{ubicacion.direccion}</p>}
                  {ubicacion.tipococina && <p>Tipo: {ubicacion.tipococina}</p>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
