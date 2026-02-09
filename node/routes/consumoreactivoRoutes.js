import express from 'express'
import { getAllConsumos, getConsumo, createConsumo, updateConsumo, deleteConsumo } from '../controllers/consumoreactivoController.js'

const router = express.Router()
router.get('/', getAllConsumos)
router.get('/:id', getConsumo)
router.post('/', createConsumo)
router.put('/:id', updateConsumo)
router.delete('/:id', deleteConsumo)

export default router
