import "./AlojamientoCard.css";

function AlojamientoCard({ alojamiento }) {
  return (
    <div className="alojamiento-card">
      <h3>{alojamiento.nombre}</h3>
      <p><strong>Categoría:</strong> {alojamiento.categoria}</p>
      {alojamiento.direccion && <p><strong>Dirección:</strong> {alojamiento.direccion}</p>}
      {alojamiento.localidad && <p><strong>Localidad:</strong> {alojamiento.localidad}</p>}
      {alojamiento.telefono && <p><strong>Teléfono:</strong> {alojamiento.telefono}</p>}
      {alojamiento.descripcion && (
        <p className="descripcion">{alojamiento.descripcion}</p>
      )}
      {alojamiento.link && (
        <a
          href={alojamiento.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ver-mas"
        >
          Ver más detalles
        </a>
      )}
    </div>
  );
}

export default AlojamientoCard;
