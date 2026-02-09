import apiAxios from "../api/axiosConfig.js";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EstadoSolicitudForm = ({ selectedEstado, refreshData, hideModal }) => {
  const [estado, setEstado] = useState("");

  const opciones = ["generado", "aceptado", "prestado", "cancelado", "entregado"];

  useEffect(() => {
    if (selectedEstado) {
      setEstado(selectedEstado.estado || "");
    } else {
      setEstado("");
    }
  }, [selectedEstado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { estado };

    try {
      if (selectedEstado) {
        await apiAxios.put(`/api/estadosolicitud/${selectedEstado.id_estado_solicitud}`, data);
        Swal.fire("¡Éxito!", "Estado actualizado", "success");
      } else {
        await apiAxios.post("/api/estadosolicitud", data);
        Swal.fire("¡Éxito!", "Estado creado", "success");
      }
      refreshData();
      hideModal();
    } catch (error) {
        console.error('Error guardando estado solicitud:', error.response?.data || error);
        Swal.fire("Error", error.response?.data?.message || "No se pudo guardar", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold text-muted" style={{ fontSize: "0.9rem" }}>
          Estado de la solicitud
        </label>
        <select
          className="form-select form-select-sm"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        >
          <option value="">Seleccionar estado...</option>
          {opciones.map(opt => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {selectedEstado && (
        <div className="alert alert-info py-2">
          <small>
            Estatus actual: <strong>{estados === 1 ? "ACTIVO" : "INACTIVO"}</strong>
            <br />Puedes cambiarlo desde la tabla
          </small>
        </div>
      )}

      <button type="submit" className="btn btn-primary w-100">
        {selectedEstado ? "Actualizar" : "Crear"} Estado
      </button>
    </form>
  );
};

export default EstadoSolicitudForm;