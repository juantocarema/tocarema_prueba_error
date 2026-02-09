import ConsumoReactivoService from '../service/consumoreactivoService.js'

export const getAllConsumos = async (req, res) => {
    try{
        const data = await ConsumoReactivoService.getAll()
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

export const getConsumo = async (req, res) => {
    try{
        const data = await ConsumoReactivoService.getById(req.params.id)
        res.status(200).json(data)
    }catch(error){
        res.status(404).json({ message: error.message })
    }
}

export const createConsumo = async (req, res) => {
    try{
        const item = await ConsumoReactivoService.create(req.body)
        res.status(201).json({ message: 'Consumo creado', item })
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

export const updateConsumo = async (req, res) => {
    try{
        await ConsumoReactivoService.update(req.params.id, req.body)
        res.status(200).json({ message: 'Consumo actualizado' })
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}

export const deleteConsumo = async (req, res) => {
    try{
        await ConsumoReactivoService.delete(req.params.id)
        res.status(200).json({ message: 'Consumo eliminado' })
    }catch(error){
        res.status(400).json({ message: error.message })
    }
}
