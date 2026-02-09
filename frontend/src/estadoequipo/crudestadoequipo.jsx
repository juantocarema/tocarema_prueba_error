import apiAxios from "../api/axiosConfig.js";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import EstadoEquipoForm from "./estadoequipoform.jsx";

const CrudEstadoEquipo = () => {
  const [estados, setEstados] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedEstado, setSelectedEstado] = useState(null);

  const customStyles = {
    table: {
      style: {
        margin: "0 auto",
        width: "fit-content",
      },
    },
    cells: {
      style: {
        justifyContent: "center",
      },
    },
  };

  const columns = [
    {
      name: "ID Estado del Equipo",
      selector: (row) => row.id_estado_equipo,
      sortable: true,
      width: "250px",
      center: true,
    },
    {
      name: "Estado Equipo",
      selector: (row) => (
        <span className={`fw-bold ${getColorEstado(row.estado)}`}>
          {row.estado?.toUpperCase() || "Sin estado"}
        </span>
      ),
      sortable: true,
      width: "250px",
      center: true,
    },
    {
      name: "Acciones",
      center: true,
      width: "180px",
      cell: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <button
            className="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalEstadoEquipo"
            onClick={() => setSelectedEstado(row)}
            title="Editar"
          >
            <i className="fa-solid fa-pencil"></i>
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => eliminarEstadoEquipo(row.id_estado_equipo)}
            title="Eliminar"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  // Nota: Se fuerza el color negro para todas las etiquetas de estado
  // porque se solicitó que las etiquetas aparezcan en negro.
  // La implementación original por estado queda comentada abajo.
  const getColorEstado = () => {
    return "text-dark";
  };

  /* Implementación original por estado (comentada):
  const getColorEstado = (estado) => {
    switch (estado) {
      case "disponible":
        return "text-success";
      case "en_uso":
        return "text-info";
      case "mantenimiento":
        return "text-warning";
      case "dañado":
        return "text-danger";
      case "descartado":
        return "text-dark";
      default:
        return "text-muted";
    }
  };
  */

  useEffect(() => {
    cargarEstados();
  }, []);

  const cargarEstados = async () => {
    try {
      const res = await apiAxios.get("/api/estadoequipo");
      setEstados(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // onSaved actualiza la lista localmente sin recargar todo
  const onSaved = (item, isUpdate) => {
    if (isUpdate) {
      setEstados((prev) => prev.map((p) => (p.id_estado_equipo === item.id_estado_equipo ? item : p)));
    } else {
      setEstados((prev) => [item, ...prev]);
    }
  };

  const filtered = estados.filter(
    (item) =>
      item.id_estado_equipo.toString().includes(filterText) ||
      item.estado?.toLowerCase().includes(filterText.toLowerCase())
  );

  const hideModal = () => {
    document.getElementById("closeModalEstadoEquipo").click();
    cargarEstados();
  };

  const eliminarEstadoEquipo = async (id) => {
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
      await apiAxios.delete(`/api/estadoequipo/${id}`);
      // Actualizar estado localmente sin recargar la lista
      setEstados((prev) => prev.filter((p) => p.id_estado_equipo !== id));
      Swal.fire("Eliminado", "Elemento eliminado", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary fw-bold">Estados del Equipo</h2>

      <div className="row mb-3 align-items-center">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por ID o estado..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="col-md-7 text-end">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalEstadoEquipo"
            onClick={() => setSelectedEstado(null)}
          >
            + Nuevo Estado
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div style={{ width: "fit-content" }}>
          <DataTable
            columns={columns}
            data={filtered}
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent="No hay estados registrados"
            customStyles={customStyles}
          />
        </div>
      </div>

      <div className="modal fade" id="modalEstadoEquipo" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {selectedEstado ? "Editar" : "Nuevo"} Estado del Equipo
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <EstadoEquipoForm
                    selectedEstado={selectedEstado}
                    onSaved={onSaved}
                    hideModal={hideModal}
                  />
            </div>
          </div>
        </div>
      </div>
      <button type="button" id="closeModalEstadoEquipo" className="btn btn-primary d-none" data-bs-dismiss="modal"></button>
    </div>
  );
};

export default CrudEstadoEquipo;
