import express from 'express'
import { getAllSolicitudPrestamo, getSolicitudPrestamo, createSolicitudPrestamo, updateSolicitudPrestamo, deleteSolicitudPrestamo, toggleEstadoSolicitud } from '../controller/solicitud_prestamoControllers.js'



const router = express.Router()

router.get('/', getAllSolicitudPrestamo);
router.get('/:id', getSolicitudPrestamo);
router.post('/', createSolicitudPrestamo);
router.put('/:id', updateSolicitudPrestamo);
router.put('/estado/:id', toggleEstadoSolicitud);
router.delete('/:id', deleteSolicitudPrestamo);

export default router;





