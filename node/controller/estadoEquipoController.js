import EstadoEquipoService from "../service/estadoEquipoService.js";

export const getAllEstadosEquipo = async (req, res) => {
  try {
    const estados = await EstadoEquipoService.getAll();
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEstadoEquipo = async (req, res) => {
  try {
    const estado = await EstadoEquipoService.getById(req.params.id);
    res.json(estado);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEstadoEquipo = async (req, res) => {
  try {
    const nuevo = await EstadoEquipoService.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEstadoEquipo = async (req, res) => {
  try {
    await EstadoEquipoService.update(req.params.id, req.body);
    res.json({ message: "Estado de equipo actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEstadoEquipo = async (req, res) => {
  try {
    await EstadoEquipoService.delete(req.params.id);
    res.json({ message: "Estado de equipo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};