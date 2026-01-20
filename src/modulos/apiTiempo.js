// API del tiempo usando Open-Meteo (sin API key necesaria)
// Caché para evitar múltiples llamadas por la misma ciudad
const cacheTemp = {};

export async function getTiempoPorCiudad(ciudad) {
  try {
    // Si ya tenemos el tiempo en caché, devolverlo
    if (cacheTemp[ciudad]) {
      return cacheTemp[ciudad];
    }

    // Coordenadas de las ciudades
    const coordenadas = {
      "Zaragoza": { lat: 41.6488, lng: -0.8891 },
      "Murcia": { lat: 37.9922, lng: -1.1307 }
    };

    const coord = coordenadas[ciudad];
    if (!coord) return null;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coord.lat}&longitude=${coord.lng}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=celsius&timezone=auto`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.current && data.daily) {
      // Pronóstico para los próximos 7 días
      const pronostico = data.daily.time.slice(0, 7).map((fecha, idx) => ({
        fecha: new Date(fecha).toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' }),
        tempMax: Math.round(data.daily.temperature_2m_max[idx]),
        tempMin: Math.round(data.daily.temperature_2m_min[idx]),
        codigo: data.daily.weather_code[idx],
        descripcion: getDescripcionClima(data.daily.weather_code[idx])
      }));

      const resultado = {
        temperatura: Math.round(data.current.temperature_2m),
        codigo: data.current.weather_code,
        descripcion: getDescripcionClima(data.current.weather_code),
        pronostico: pronostico
      };
      
      // Guardar en caché
      cacheTemp[ciudad] = resultado;
      return resultado;
    }
    
    return null;
  } catch (error) {
    console.warn(`Error al obtener tiempo para ${ciudad}:`, error);
    return null;
  }
}

// Función para traducir códigos de clima a descripción
function getDescripcionClima(codigo) {
  const descripciones = {
    0: "Despejado",
    1: "Mostly Despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Niebla escarcha",
    51: "Llovizna ligera",
    53: "Llovizna moderada",
    55: "Llovizna intensa",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia fuerte",
    71: "Nieve ligera",
    73: "Nieve moderada",
    75: "Nieve fuerte",
    77: "Granos de nieve",
    80: "Aguaceros ligeros",
    81: "Aguaceros moderados",
    82: "Aguaceros intensos",
    85: "Chubascos de nieve ligeros",
    86: "Chubascos de nieve intensos",
    95: "Tormenta",
    96: "Tormenta con granizo ligero",
    99: "Tormenta con granizo fuerte"
  };
  
  return descripciones[codigo] || "Desconocido";
}
