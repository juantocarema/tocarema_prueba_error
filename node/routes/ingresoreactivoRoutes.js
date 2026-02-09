import express from 'express'
import { getAllIngresos, getIngreso, createIngreso, updateIngreso, deleteIngreso } from '../controllers/ingresoreactivoController.js'

const router = express.Router()
router.get('/', getAllIngresos)
router.get('/:id', getIngreso)
router.post('/', createIngreso)
router.put('/:id', updateIngreso)
router.delete('/:id', deleteIngreso)

export default router
