import consumoreactivoModel from '../models/consumoreactivoModel.js'

class ConsumoReactivoService {
    async getAll(){
        return await consumoreactivoModel.findAll()
    }

    async getById(id){
        const item = await consumoreactivoModel.findByPk(id)
        if(!item) throw new Error('Consumo no encontrado')
        return item
    }

    async create(data){
        return await consumoreactivoModel.create(data)
    }

    async update(id,data){
        const result = await consumoreactivoModel.update(data, { where: { id_consumo_reactivos: id }})
        const updated = result[0]
        if (updated === 0) throw new Error('No se actualizó el consumo')
        return true
    }

    async delete(id){
        const deleted = await consumoreactivoModel.destroy({ where: { id_consumo_reactivos: id }})
        if(!deleted) throw new Error('No se pudo eliminar')
        return true
    }
}

export default new ConsumoReactivoService()
