import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./MapaComponent.css";

// Coordenadas de ciudades principales
const CIUDADES_ESPAÑA = {
  "zaragoza": [41.6488, -0.8891],
  "murcia": [37.9922, -1.1307],
  "madrid": [40.4168, -3.7038],
  "barcelona": [41.3851, 2.1734],
};

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

// Cache de geocodificación
const geocodingCache = {};

// Función para geocodificar una dirección
async function geocodificarDireccion(direccion, ciudad) {
  // Crear clave de caché
  const cacheKey = `${direccion}-${ciudad}`;
  
  // Verificar caché
  if (geocodingCache.hasOwnProperty(cacheKey)) {
    return geocodingCache[cacheKey];
  }

  try {
    // Extraer solo la parte útil de la dirección - mantener calle y número
    let direccionLimpia = direccion
      .split(/[Tt]el\.?/)[0] // Partir por "Tel"
      .split(/[Cc]ódigo/)[0] // Partir por "Código"
      .split(/[Cc]od\./)[0] // Partir por "Cod."
      .trim();

    // Si la dirección es muy corta después de limpiar, solo usar ciudad
    if (direccionLimpia.length < 5) {
      geocodingCache[cacheKey] = null;
      return null;
    }

    // Búsqueda 1: Dirección completa con ciudad
    let query = `${direccionLimpia}, ${ciudad}, España`;
    
    let response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=es&limit=5&timeout=5`,
      { signal: AbortSignal.timeout(10000) }
    );
    
    let data = await response.json();
    
    // Si encontró resultados, tomar el primero (mejor coincidencia)
    if (data && data.length > 0 && data[0].lat && data[0].lon) {
      const coordenadas = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
      geocodingCache[cacheKey] = coordenadas;
      return coordenadas;
    }

    // Búsqueda 2: Solo la dirección sin ciudad
    query = `${direccionLimpia}, España`;
    response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=es&limit=5&timeout=5`,
      { signal: AbortSignal.timeout(10000) }
    );
    
    data = await response.json();
    
    if (data && data.length > 0 && data[0].lat && data[0].lon) {
      const coordenadas = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
      geocodingCache[cacheKey] = coordenadas;
      return coordenadas;
    }
    
  } catch (error) {
    console.warn("Error en geocoding para:", direccion, error);
  }
  
  // Guardar en caché que no se encontró
  geocodingCache[cacheKey] = null;
  return null;
}

// Función para obtener coordenadas de la ciudad
function obtenerCoordenadasCiudad(ciudad) {
  if (!ciudad) return null;
  const ciudadNormalizada = ciudad.toLowerCase().trim();
  return CIUDADES_ESPAÑA[ciudadNormalizada] ? {
    lat: CIUDADES_ESPAÑA[ciudadNormalizada][0],
    lng: CIUDADES_ESPAÑA[ciudadNormalizada][1],
  } : null;
}

export default function MapaComponent({ ubicaciones, centroDefault = [40.4168, -3.7038] }) {
  const [ubicacionesConCoordenadas, setUbicacionesConCoordenadas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function procesarUbicaciones() {
      setCargando(true);
      const procesadas = [];

      for (const ubicacion of ubicaciones) {
        let lat = parseFloat(ubicacion.lat);
        let lng = parseFloat(ubicacion.lng);
        let tieneCoordenadasValidas = !isNaN(lat) && !isNaN(lng);

        if (tieneCoordenadasValidas) {
          // Validar que las coordenadas estén en España (aproximadamente)
          if (lat >= 35 && lat <= 44 && lng >= -10 && lng <= 4) {
            // Coordenadas válidas en España
            procesadas.push(ubicacion);
          } else {
            // Coordenadas fuera de España, ignorar
            tieneCoordenadasValidas = false;
          }
        }

        // Si no tiene coordenadas válidas, intentar geocodificar
        if (!tieneCoordenadasValidas && ubicacion.direccion && ubicacion.localidad) {
          const coordenadas = await geocodificarDireccion(
            ubicacion.direccion,
            ubicacion.localidad || ubicacion.ciudad
          );
          
          if (coordenadas) {
            procesadas.push({
              ...ubicacion,
              lat: coordenadas.lat,
              lng: coordenadas.lng,
            });
          } else {
            // Solo usar fallback de ciudad si el geocoding completamente falló
            const coordenadasCiudad = obtenerCoordenadasCiudad(ubicacion.localidad || ubicacion.ciudad);
            if (coordenadasCiudad) {
              procesadas.push({
                ...ubicacion,
                lat: coordenadasCiudad.lat,
                lng: coordenadasCiudad.lng,
              });
            } else {
              procesadas.push(ubicacion);
            }
          }
        }
        
        // Pequeño delay
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setUbicacionesConCoordenadas(procesadas);
      setCargando(false);
    }

    procesarUbicaciones();
  }, [ubicaciones]);

  if (cargando) {
    return (
      <div className="mapa-contenedor">
        <p className="sin-coordenadas">Cargando mapa...</p>
      </div>
    );
  }

  // Validar que tengamos ubicaciones con coordenadas
  const ubicacionesValidas = ubicacionesConCoordenadas.filter((u) => {
    const lat = parseFloat(u.lat);
    const lng = parseFloat(u.lng);
    return !isNaN(lat) && !isNaN(lng);
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
          No se pueden obtener las coordenadas para mostrar en el mapa
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
