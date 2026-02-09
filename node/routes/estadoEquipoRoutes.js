import express from 'express'
import {
  getAllEstadosEquipo,
  getEstadoEquipo,
  createEstadoEquipo,
  updateEstadoEquipo,
  deleteEstadoEquipo
} from '../controller/estadoEquipoController.js'

const router = express.Router()

router.get('/', getAllEstadosEquipo)
router.get('/:id', getEstadoEquipo)
router.post('/', createEstadoEquipo)
router.put('/:id', updateEstadoEquipo)
router.delete('/:id', deleteEstadoEquipo)

export default router