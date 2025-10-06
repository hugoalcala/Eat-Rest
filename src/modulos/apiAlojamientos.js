//Para pedir los alojamientos de zaragoza
export async function getAlojamientosZaragoza() {
  const res = await fetch(
    "https://www.zaragoza.es/sede/servicio/alojamiento.json?rows=200"
  );
  const data = await res.json();

  // Algunos endpoints devuelven los alojamientos en data.result
  const alojamientos = data.result || [];

  return alojamientos.map((a, i) => ({
    id: a.id || i,
    nombre: a.title || "Sin nombre",
    descripcion: a.description || "",
    direccion: a.streetAddress || "",
    telefono: a.telefonos || "",
    categoria: a.categoria || "Desconocido",
    camas: a.camas || null,
    habitaciones: a.habitaciones || null,
    localidad: a.addressLocality || "",
    link: a.link || "",
    lat: a.lat || null,  // No siempre está disponible
    lng: a.lng || null,  // Pero lo dejamos por consistencia
  }));
}


//Para pedir los alojamientos de murcia
export async function getAlojamientosMurcia() {
    const res = await fetch("https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Hoteles.json");
    const data = await res.json();
}