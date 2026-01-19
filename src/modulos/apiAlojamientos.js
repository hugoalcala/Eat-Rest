// apiAlojamientos.js


// Zaragoza hoteles
export async function getAlojamientosZaragoza() {
  const url = "https://www.zaragoza.es/sede/servicio/alojamiento.json";
  const res = await fetch(url);
  const data = await res.json();
  const items = data.result || data || [];
  return items.map((item, idx) => {
    // Intentar extraer coordenadas de múltiples campos
    let lat = item.latitud || item.Latitud || null;
    let lng = item.longitud || item.Longitud || null;
    
    // Si están en un objeto geometry
    if (item.geometry && item.geometry.coordinates) {
      lng = item.geometry.coordinates[0];
      lat = item.geometry.coordinates[1];
    }
    
    // Si están en location
    if (item.location) {
      lat = item.location.latitude || item.location.lat || lat;
      lng = item.location.longitude || item.location.lng || lng;
    }

    return {
      id: `zaragoza-${item.id || idx}`,
      nombre: item.title || item.Nombre || "Sin nombre",
      descripcion: item.description || "Sin descripción",
      direccion: item.streetAddress || item.Direccion || "Dirección no disponible",
      localidad: item.addressLocality || "Zaragoza",
      categoria: (item.categoria || item.TipoAlojamiento || "No especificada").replace(/^categoria/i, "").trim(),
      lat: lat,
      lng: lng,
      link: item.uri || item.link || null,
      telefono: item.telephone || item.Telefono || null,
      email: item.email || item.Email || null,
      web: item.url || item.Web || null,
      horario: item.horario || item.Horario || null,
      numEstrellas: item.numEstrellas || item.NumEstrellas || null,
    };
  });
}

// Murcia hoteles
export async function getAlojamientosMurcia() {
  const url = "https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Hoteles.json";
  const res = await fetch(url);
  const data = await res.json();
  return data.map((item, idx) => ({
    id: `murcia-${item.Id || idx}`,
    nombre: item.Nombre || "Sin nombre",
    descripcion: item.Descripcion || "Sin descripción",
    direccion: item.Direccion || "Dirección no disponible",
    localidad: "Murcia",
    categoria: item.TipoAlojamiento || item.Categoria || "No especificada",
    lat: item.Longitud || null,  // Invertidos
    lng: item.Latitud || null,   // Invertidos
    telefono: item.Telefono || null,
    email: item.Email || null,
    web: item.Web || null,
    horario: item.Horario || null,
    numEstrellas: item.NumEstrellas || null,
  }));
}
