import apiAxios from "../api/axiosConfig.js";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import SolicitudXEquipoForm from "./solicitudxequipoform.jsx";

const CrudSolicitudXEquipo = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  const customStyles = {
    table: { style: { margin: "0 auto", width: "fit-content" } },
  };

  const columns = [
    {
      name: "ID Relación",
      selector: (row) => row.id_solicitudxequipo,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "ID Solicitud",
      selector: (row) => row.id_solicitud,
      sortable: true,
      width: "160px",
      center: true,
    },
    {
      name: "ID Equipo",
      selector: (row) => row.id_equipo,
      sortable: true,
      width: "160px",
      center: true,
    },
    {
      name: "Estado",
      width: "140px",
      center: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-pill text-white fw-semibold ${
            row.estado === 1 ? "bg-success" : "bg-danger"
          }`}
          style={{ fontSize: "0.78rem" }}
        >
          {row.estado === 1 ? "ACTIVO" : "INACTIVO"}
        </span>
      ),
    },
    {
      name: "Acciones",
      center: true,
      width: "190px",
      cell: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <button
            className="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalSolicitudEquipo"
            onClick={() => setSelectedSolicitud(row)}
            title="Editar"
          >
            <i className="fa-solid fa-pencil"></i>
          </button>

          <button
            className={`btn btn-sm ${
              row.estado === 1 ? "btn-outline-danger" : "btn-outline-success"
            }`}
            onClick={() => toggleEstado(row.id_solicitudxequipo, row.estado)}
            title={row.estado === 1 ? "Inactivar" : "Activar"}
          >
            <i className={`fas ${row.estado === 1 ? "fa-ban" : "fa-check"}`}></i>
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => eliminarRelacion(row.id_solicitudxequipo)}
            title="Eliminar"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const res = await apiAxios.get("/api/solicitudxequipo");
      setSolicitudes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 1 ? 0 : 1;

    const result = await Swal.fire({
      title: "¿Cambiar estado?",
      text: `Esta relación pasará a estar ${nuevoEstado === 1 ? "ACTIVA" : "INACTIVA"}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: nuevoEstado === 1 ? "#28a745" : "#dc3545",
    });

    if (!result.isConfirmed) return;

    try {
      await apiAxios.put(`/api/solicitudxequipo/estado/${id}`);

      setSolicitudes((prev) =>
        prev.map((item) => (item.id_solicitudxequipo === id ? { ...item, estado: nuevoEstado } : item))
      );

      Swal.fire("¡Perfecto!", `Relación ahora está ${nuevoEstado === 1 ? "ACTIVA" : "INACTIVA"}`, "success");
    } catch (error) {
      console.error("Error al cambiar estado:", error.response || error);
      Swal.fire("Error", "No se pudo cambiar el estado", "error");
    }
  };

  const hideModal = () => {
    document.getElementById("closeModalSolicitud").click();
    cargarDatos();
  };

  const eliminarRelacion = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await apiAxios.delete(`/api/solicitudxequipo/${id}`);
      cargarDatos();
      Swal.fire("Eliminado", "Relación eliminada", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  const filtered = solicitudes.filter(
    (item) =>
      item.id_solicitudxequipo.toString().includes(filterText) ||
      item.id_solicitud.toString().includes(filterText) ||
      item.id_equipo.toString().includes(filterText)
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 text-primary fw-bold display-5">Solicitud × Equipo</h2>

      <div className="row mb-4 align-items-center">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por ID..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="col-md-7 text-end">
          <button
            className="btn btn-primary btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#modalSolicitudEquipo"
            onClick={() => setSelectedSolicitud(null)}
          >
            + Nueva Relación
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div style={{ width: "fit-content", minWidth: "800px" }}>
          <DataTable
            columns={columns}
            data={filtered}
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent="No hay relaciones registradas"
            paginationPerPage={10}
            customStyles={customStyles}
          />
        </div>
      </div>

      {/* MODAL */}
      <div className="modal fade" id="modalSolicitudEquipo" tabIndex="-1">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">{selectedSolicitud ? "Editar" : "Nueva"} Relación</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <SolicitudXEquipoForm selectedSolicitud={selectedSolicitud} refreshData={cargarDatos} hideModal={hideModal} />
            </div>
          </div>
        </div>
      </div>
      <button type="button" id="closeModalSolicitud" className="btn btn-primary d-none" data-bs-dismiss="modal"></button>
    </div>
  );
};

export default CrudSolicitudXEquipo;
