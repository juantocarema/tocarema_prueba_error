import IngresoReactivoService from '../service/ingresoreactivoService.js'

export const getAllIngresos = async (req, res) => {
    try{
        const data = await IngresoReactivoService.getAll()
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

export const getIngreso = async (req, res) => {
    try{
        const data = await IngresoReactivoService.getById(req.params.id)
        res.status(200).json(data)
    }catch(error){
        res.status(404).json({ message: error.message })
    }
}

export const createIngreso = async (req, res) => {
    try{
        const item = await IngresoReactivoService.create(req.body)
        res.status(201).json({ message: 'Ingreso creado', item })
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

export const updateIngreso = async (req, res) => {
    try{
        await IngresoReactivoService.update(req.params.id, req.body)
        res.status(200).json({ message: 'Ingreso actualizado' })
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

export const deleteIngreso = async (req, res) => {
    try{
        await IngresoReactivoService.delete(req.params.id)
        res.status(200).json({ message: 'Ingreso eliminado' })
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}
