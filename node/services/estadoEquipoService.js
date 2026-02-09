import estadoEquipoModel from '../models/estadoEquipoModel.js';

class estadoEquipoService {
    async getAll() {
        return await estadoEquipoModel.findAll()
    }

    async getById(id_estado_equipo) {
        const estado = await estadoEquipoModel.findByPk(id_estado_equipo)
        if (!estado) throw new Error('Estado equipo no encontrado')
        return estado
    }

    async create(Data) {
        return await estadoEquipoModel.create(Data)
    }

    async update(id_estado_equipo, Data) {
        const result = await estadoEquipoModel.update(Data, { where: { id_estado_equipo } })
        const updated = result[0]
        if (updated === 0) throw new Error('Estado equipo no encontrado')
        return true
    }

    async delete(id_estado_equipo) {
        const deleted = await estadoEquipoModel.destroy({ where: { id_estado_equipo } })
        if (!deleted) throw new Error('Estado equipo no encontrado')
        return true
    }
}

export default new estadoEquipoService();
