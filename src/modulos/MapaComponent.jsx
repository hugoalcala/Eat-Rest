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

// Función para convertir UTM a lat/lng
function convertUTMtoLatLng(easting, northing, zone = 30) {
  const K0 = 0.9996;
  const E = 0.00669438;
  const E2 = E / (1.0 - E);
  const R = 6378137.0;

  const x = easting - 500000;
  const y = northing;
  const m = y / K0;
  const mu = m / (R * (1.0 - E / 4.0 - 3.0 * E * E / 64.0 - 5.0 * E * E * E / 256.0));

  const p1 = mu + (3.0 / 8.0) * E2 * Math.sin(2.0 * mu) + (31.0 / 128.0) * E2 * E2 * Math.sin(4.0 * mu);
  const p2 = (3.0 / 8.0) * E2 * Math.sin(2.0 * p1) + (31.0 / 128.0) * E2 * E2 * Math.sin(4.0 * p1);
  const p3 = (15.0 / 128.0) * E2 * E2 * Math.sin(2.0 * p1);

  const lat = (p1 - p2 + p3) * 180.0 / Math.PI;

  const n = R / Math.sqrt(1.0 - E * Math.sin(p1) * Math.sin(p1));
  const t = Math.tan(p1) * Math.tan(p1);
  const c = E2 * Math.cos(p1) * Math.cos(p1);
  const d = x / (n * K0);

  const lng = ((d - d * d * d / 6.0 * (1.0 + 2.0 * t + c) +
    d * d * d * d * d / 120.0 * (5.0 - 2.0 * c + 28.0 * t - 3.0 * c * c + 8.0 * E2 + 24.0 * t * t)) /
    Math.cos(p1)) * 180.0 / Math.PI;

  return {
    lat: lat,
    lng: lng + (zone - 1) * 6.0 - 180.0 + 3.0,
  };
}

export default function MapaComponent({ ubicaciones, centroDefault = [40.4168, -3.7038] }) {
  // Validar que tengamos ubicaciones con coordenadas válidas
  const ubicacionesValidas = ubicaciones
    .map((u) => {
      let lat = parseFloat(u.lat);
      let lng = parseFloat(u.lng);

      // Si alguno es null/undefined, retornar null
      if (u.lat === null || u.lat === undefined || u.lng === null || u.lng === undefined) {
        return null;
      }

      // Verificar que sean números válidos
      if (isNaN(lat) || isNaN(lng)) return null;

      // Rechazar coordenadas 0,0
      if (lat === 0 && lng === 0) return null;

      // Si ambos son muy grandes (> 10000), son probablemente UTM
      if (Math.abs(lat) > 10000 && Math.abs(lng) > 10000) {
        try {
          const converted = convertUTMtoLatLng(lng, lat, 30);
          lat = converted.lat;
          lng = converted.lng;
        } catch (e) {
          return null;
        }
      }

      // Si lat > 180 o lng > 180, es inválido
      if (Math.abs(lat) > 180 || Math.abs(lng) > 180) return null;

      // Validar rango de latitud (-90 a 90)
      if (lat < -90 || lat > 90) {
        // Si lat está fuera de rango pero lng está dentro, probablemente estén invertidos
        if (lng >= -90 && lng <= 90) {
          [lat, lng] = [lng, lat];
        } else {
          return null;
        }
      }

      // Validar rango de longitud (-180 a 180)
      if (lng < -180 || lng > 180) return null;

      // Validar que tenga sentido para España/Murcia
      if (lat < 30 || lat > 45) return null;
      if (lng < -10 || lng > 5) return null;

      return {
        ...u,
        lat: lat,
        lng: lng,
      };
    })
    .filter((u) => u !== null);

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

  // Si no hay ubicaciones válidas, no renderizar nada
  if (ubicacionesValidas.length === 0) {
    return null;
  }

  return (
    <div className="mapa-contenedor">
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
    </div>
  );
}
