import React, { useState } from "react";
import "./ReservaForm.css";

function ReservaForm({ alojamiento, onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fechaEntrada: "",
    fechaSalida: "",
    personas: 1,
    tarjeta: "",
    mes: "",
    año: "",
    cvv: ""
  });

  const [paso, setPaso] = useState(1); // Paso 1: datos, Paso 2: pago
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Precio por noche (en euros)
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

  const validarPaso2 = () => {
    if (!formData.tarjeta || formData.tarjeta.length < 13) {
      setError("Número de tarjeta inválido");
      return false;
    }
    if (!formData.mes || !formData.año) {
      setError("Completa la fecha de vencimiento");
      return false;
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      setError("CVV inválido");
      return false;
    }
    return true;
  };

  const handleSiguiente = () => {
    if (validarPaso1()) {
      setPaso(2);
    }
  };

  const handleReservar = async () => {
    if (!validarPaso2()) return;

    setLoading(true);
    // Simular procesamiento
    setTimeout(() => {
      setLoading(false);
      alert(
        `¡Reserva confirmada!\n\nAlojamiento: ${alojamiento.nombre}\nHuéspedes: ${formData.personas}\nNoche: €${precioPorNoche}\nNúmero de noches: ${calcularTotal() / precioPorNoche}\nTotal: €${calcularTotal()}\n\nReserva a nombre de: ${formData.nombre}`
      );
      onClose();
    }, 2000);
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
            <h3>Datos de pago</h3>

            <div className="form-grupo">
              <label>Número de tarjeta</label>
              <input
                type="text"
                name="tarjeta"
                value={formData.tarjeta}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, "");
                  setFormData({ ...formData, tarjeta: value });
                }}
                placeholder="4242 4242 4242 4242"
                maxLength="19"
              />
              <small>Usa: 4242 4242 4242 4242 (tarjeta de prueba)</small>
            </div>

            <div className="form-row">
              <div className="form-grupo">
                <label>Mes/Año</label>
                <div className="fecha-vencimiento">
                  <input
                    type="text"
                    name="mes"
                    value={formData.mes}
                    onChange={handleChange}
                    placeholder="MM"
                    maxLength="2"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    name="año"
                    value={formData.año}
                    onChange={handleChange}
                    placeholder="YY"
                    maxLength="2"
                  />
                </div>
              </div>

              <div className="form-grupo">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>

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

            {error && <p className="error">{error}</p>}

            <div className="botones-pago">
              <button className="btn-atras" onClick={() => setPaso(1)}>
                Atrás
              </button>
              <button 
                className="btn-reservar" 
                onClick={handleReservar}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Confirmar reserva"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservaForm;
