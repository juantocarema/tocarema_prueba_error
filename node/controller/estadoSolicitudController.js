import EstadoSolicitudService from "../service/estadoSolicitudService.js";

export const getAllEstadosSolicitud = async (req, res) => {
  try {
    const estados = await EstadoSolicitudService.getAll();
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEstadoSolicitud = async (req, res) => {
  try {
    const estado = await EstadoSolicitudService.getById(req.params.id);
    res.json(estado);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEstadoSolicitud = async (req, res) => {
  try {
    const nuevo = await EstadoSolicitudService.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEstadoSolicitud = async (req, res) => {
  try {
    await EstadoSolicitudService.update(req.params.id, req.body);
    res.json({ message: "Estado de solicitud actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEstadoSolicitud = async (req, res) => {
  try {
    await EstadoSolicitudService.delete(req.params.id);
    res.json({ message: "Estado de solicitud eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};