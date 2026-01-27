import React, { useState } from "react";
import PagoStripe from "./PagoStripe";
import "./ReservaForm.css";

function ReservaForm({ alojamiento, onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fechaEntrada: "",
    fechaSalida: "",
    personas: 1,
  });

  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const precioPorNoche = 85;

  const calcularTotal = () => {
    if (!formData.fechaEntrada || !formData.fechaSalida) return 0;
    const entrada = new Date(formData.fechaEntrada);
    const salida = new Date(formData.fechaSalida);
    const noches = Math.ceil((salida - entrada) / (1000 * 60 * 60 * 24));
    return noches > 0 ? noches * precioPorNoche : 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const validarPaso1 = () => {
    if (!formData.nombre || !formData.email || !formData.telefono) {
      setError("Por favor completa todos los campos personales");
      return false;
    }
    if (!formData.fechaEntrada || !formData.fechaSalida) {
      setError("Por favor selecciona fechas de entrada y salida");
      return false;
    }
    const entrada = new Date(formData.fechaEntrada);
    const salida = new Date(formData.fechaSalida);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (entrada < hoy) {
      setError("La fecha de entrada no puede ser en el pasado");
      return false;
    }
    if (salida <= entrada) {
      setError("La fecha de salida debe ser después de la entrada");
      return false;
    }
    if (formData.personas < 1) {
      setError("Debe haber al menos una persona");
      return false;
    }
    return true;
  };

  const handleSiguiente = () => {
    if (validarPaso1()) {
      setPaso(2);
    }
  };

  const handlePagoExito = (paymentIntent) => {
    setLoading(false);
    alert(
      `✓ ¡Reserva confirmada!\n\nAlojamiento: ${alojamiento.nombre}\nFechas: ${formData.fechaEntrada} a ${formData.fechaSalida}\nHuéspedes: ${formData.personas}\nNoches: ${calcularTotal() / precioPorNoche}\nTotal: €${calcularTotal()}\n\nA nombre de: ${formData.nombre}\n\nID Transacción: ${paymentIntent.id}\n\n(Simulado - Sin cargo real)`
    );
    onClose();
  };

  const handleErrorPago = (mensajeError) => {
    setError(mensajeError);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h2>Reservar: {alojamiento.nombre}</h2>

        {paso === 1 ? (
          <div className="paso1">
            <h3>Datos de la reserva</h3>
            
            <div className="form-grupo">
              <label>Nombre completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Juan García"
              />
            </div>

            <div className="form-grupo">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-grupo">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+34 600 000 000"
              />
            </div>

            <div className="form-row">
              <div className="form-grupo">
                <label>Fecha de entrada</label>
                <input
                  type="date"
                  name="fechaEntrada"
                  value={formData.fechaEntrada}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label>Fecha de salida</label>
                <input
                  type="date"
                  name="fechaSalida"
                  value={formData.fechaSalida}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-grupo">
              <label>Número de personas</label>
              <input
                type="number"
                name="personas"
                min="1"
                value={formData.personas}
                onChange={handleChange}
              />
            </div>

            {formData.fechaEntrada && formData.fechaSalida && (
              <div className="resumen-precio">
                <p>Noches: {calcularTotal() / precioPorNoche}</p>
                <p>Precio/noche: €{precioPorNoche}</p>
                <h4>Total: €{calcularTotal()}</h4>
              </div>
            )}

            {error && <p className="error">{error}</p>}

            <button className="btn-siguiente" onClick={handleSiguiente}>
              Continuar al pago
            </button>
          </div>
        ) : (
          <div className="paso2">
            <h3>Pago seguro con Stripe</h3>
            <p className="stripe-info">Formulario de pago de Stripe integrado</p>

            <div className="resumen-final">
              <div className="detalle">
                <p><strong>{alojamiento.nombre}</strong></p>
                <p>{formData.fechaEntrada} a {formData.fechaSalida}</p>
                <p>{formData.personas} {formData.personas === 1 ? "huésped" : "huéspedes"}</p>
              </div>
              <div className="monto">
                <h3>€{calcularTotal()}</h3>
              </div>
            </div>

            <PagoStripe
              total={calcularTotal()}
              nombre={formData.nombre}
              email={formData.email}
              onPago={handlePagoExito}
              onError={handleErrorPago}
              loading={loading}
            />

            {error && <p className="error">{error}</p>}

            <div className="botones-pago">
              <button className="btn-atras" onClick={() => setPaso(1)} disabled={loading}>
                Atrás
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservaForm;
