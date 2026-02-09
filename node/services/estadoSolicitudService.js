import estadoSolicitudModel from '../models/estadoSolicitudModel.js';

class estadoSolicitudService {
    async getAll() {
        return await estadoSolicitudModel.findAll()
    }

    async getById(id_estado_solicitud) {
        const estado = await estadoSolicitudModel.findByPk(id_estado_solicitud)
        if (!estado) throw new Error('Estado solicitud no encontrado')
        return estado
    }

    async create(Data) {
        return await estadoSolicitudModel.create(Data)
    }

    async update(id_estado_solicitud, Data) {
        const result = await estadoSolicitudModel.update(Data, { where: { id_estado_solicitud } })
        const updated = result[0]
        if (updated === 0) throw new Error('Estado solicitud no encontrado')
        return true
    }

    async delete(id_estado_solicitud) {
        const deleted = await estadoSolicitudModel.destroy({ where: { id_estado_solicitud } })
        if (!deleted) throw new Error('Estado solicitud no encontrado')
        return true
    }
}

export default new estadoSolicitudService();
