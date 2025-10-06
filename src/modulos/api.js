// Zaragoza
export async function getRestaurantesZaragoza() {
  const res = await fetch("https://www.zaragoza.es/sede/servicio/restaurante.geojson?srsname=wgs84");
  const data = await res.json();
  return data.features.map((feat, idx) => {
    const props = feat.properties || {};
    return {
      id: props?.gid ?? feat.id ?? idx,
      nombre:
        props.title ||
        props.nombre ||
        props.NombreComercial ||
        "Sin nombre",
      tipococina: props.cocina || props.tipo || "Desconocido",
      lat: feat.geometry?.coordinates?.[1],
      lng: feat.geometry?.coordinates?.[0],
    };
  });
}

// Murcia
export async function getRestaurantesMurcia() {
  const res = await fetch("https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Restaurantes.json");
  const data = await res.json();
  return data.map((resto, i) => ({
    id: resto.Id ?? i,
    nombre: resto.Nombre || resto.denominacion || "Sin nombre",
    tipococina: resto.TipoCocina || resto.tipo || "Desconocido",
    lat: resto.Latitud,
    lng: resto.Longitud,
  }));
}
