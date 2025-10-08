// apiAlojamientos.js

// Zaragoza alojamientos
export async function getAlojamientosZaragoza() {
  const url = "https://www.zaragoza.es/sede/servicio/alojamiento.geojson?srsname=wgs84&rows=100";
  const res = await fetch(url);
  const data = await res.json();

  const items = data.features || data.result || [];

  return items.map((feat, idx) => {
    const props = feat.properties || feat;
    return {
      id: props.id || idx,
      nombre: props.title || props.Nombre || "Sin nombre",
      descripcion: props.description || "Sin descripción",
      direccion: props.streetAddress || props.Direccion || "Dirección no disponible",
      localidad: props.addressLocality || "Zaragoza",
      categoria: props.categoria || "No especificada",
      lat: feat.geometry?.coordinates?.[1],
      lng: feat.geometry?.coordinates?.[0],
      link: props.uri || props.link || null,
    };
  });
}

// Murcia alojamientos
export async function getAlojamientosMurcia() {
  const url = "https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Alojamientos.json";
  const res = await fetch(url);
  const data = await res.json();

  return data.map((item, idx) => ({
    id: item.Id || idx,
    nombre: item.Nombre || "Sin nombre",
    descripcion: item.Descripcion || "Sin descripción",
    direccion: item.Direccion || "Dirección no disponible",
    localidad: "Murcia",
    categoria: item.TipoAlojamiento || "No especificada",
    lat: item.Latitud || null,
    lng: item.Longitud || null,
  }));
}
