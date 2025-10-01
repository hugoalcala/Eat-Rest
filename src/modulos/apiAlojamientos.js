//Para pedir los alojamientos de zaragoza
export async function getAlojamientosZaragoza() {
    const res = await fetch("https://www.zaragoza.es/sede/servicio/alojamiento.json");
    const json = await res.json();

}

//Para pedir los alojamientos de murcia
export async function getAlojamientosMurcia() {
    const res = await fetch("https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Hoteles.json");
    const data = await res.json();
}