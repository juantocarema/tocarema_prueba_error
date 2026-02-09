import ingresoreactivoModel from '../models/ingresoreactivoModel.js'

class IngresoReactivoService {
    async getAll(){
        return await ingresoreactivoModel.findAll()
    }

    async getById(id){
        const item = await ingresoreactivoModel.findByPk(id)
        if(!item) throw new Error('Ingreso no encontrado')
        return item
    }

    async create(data){
        return await ingresoreactivoModel.create(data)
    }

    async update(id,data){
        const result = await ingresoreactivoModel.update(data, { where: { id_ingreso_reactivo: id }})
        const updated = result[0]
        if (updated === 0) throw new Error('No se actualizó el ingreso')
        return true
    }

    async delete(id){
        const deleted = await ingresoreactivoModel.destroy({ where: { id_ingreso_reactivo: id }})
        if(!deleted) throw new Error('No se pudo eliminar')
        return true
    }
}

export default new IngresoReactivoService()
