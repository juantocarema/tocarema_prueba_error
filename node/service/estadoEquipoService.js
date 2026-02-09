import estadoEquipoModel from "../models/estadoEquipoModel.js";

class EstadoEquipoService {
  async getAll() {
    return await estadoEquipoModel.findAll();
  }

  async getById(id_estado_equipo) {
    const estado = await estadoEquipoModel.findByPk(id_estado_equipo);
    if (!estado) throw new Error("Estado de equipo no encontrado");
    return estado;
  }

  async create(data) {
    return await estadoEquipoModel.create(data);
  }

  async update(id, data) {
    const [updated] = await estadoEquipoModel.update(data, {
      where: { id_estado_equipo: id },
    });
    if (!updated) throw new Error("No se pudo actualizar el estado de equipo");
    return true;
  }

  async delete(id) {
    const deleted = await estadoEquipoModel.destroy({
      where: { id_estado_equipo: id },
    });
    if (!deleted) throw new Error("No se pudo eliminar el estado de equipo");
    return true;
  }
}

export default new EstadoEquipoService();