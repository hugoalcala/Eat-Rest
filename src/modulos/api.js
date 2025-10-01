// Función para pedir restaurantes de Zaragoza
export async function getRestaurantesZaragoza() {
  const res = await fetch("https://www.zaragoza.es/sede/servicio/restaurante.geojson");
  const geojson = await res.json();

  return geojson.features.map((feat) => ({
    id: feat.properties?.gid ?? feat.id,
    nombre: feat.properties?.nombre || "Sin nombre",
    tipococina: feat.properties?.tipo || "Desconocido",
    lat: feat.geometry?.coordinates?.[1],
    lng: feat.geometry?.coordinates?.[0],
  }));
}

// Función para pedir restaurantes de Murcia
export async function getRestaurantesMurcia() {
  const res = await fetch(
    "https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Restaurantes.json"
  );
  const data = await res.json();

  return data.map((r, index) => ({
    id: r.id || index,
    nombre: r.nombre || "Sin nombre",
    tipococina: r.tipo || "Desconocido",
    lat: r.latitud,
    lng: r.longitud,
  }));
}
