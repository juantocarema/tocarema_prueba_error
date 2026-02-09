import solicitud_prestamoService from "../service/solicitud_prestamoService.js";

// Función para mapear datos (agregar id_solicitudxequipo)
const mapSolicitudes = (data) => {
    const isArray = Array.isArray(data);
    const items = isArray ? data : [data];
    
    const mapped = items.map(item => ({
        id_solicitudxequipo: item.id_solicitud,
        id_solicitud: item.id_solicitud,
        id_equipo: item.id_equipo,
        estado: item.estado,
        estado_solicitud: item.estado_solicitud,
        fecha_hora_registro: item.fecha_hora_registro,
        fecha_inicio: item.fecha_inicio,
        fecha_fin: item.fecha_fin,
        id_persona_solicitante: item.id_persona_solicitante
    }));
    
    return isArray ? mapped : mapped[0];
};

export const getAllSolicitudPrestamo = async (req, res) => {
    try {
        const solicitud = await solicitud_prestamoService.getAll();
        const mapped = mapSolicitudes(solicitud);
        res.status(200).json(mapped); // 200 OK
    } catch (error) {
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
};

export const getSolicitudPrestamo = async (req, res) => {
    try {
        const solicitud = await solicitud_prestamoService.getById(req.params.id);
        const mapped = mapSolicitudes(solicitud);
        res.status(200).json(mapped); // 200 OK
    } catch (error) {
        res.status(404).json({ message: error.message }); // 404 Not Found
    }
};

export const createSolicitudPrestamo = async (req, res) => {
    try {
        const solicitud = await solicitud_prestamoService.create(req.body);
        const mapped = mapSolicitudes(solicitud);
        res.status(201).json({ message: "Solicitud creada", solicitud: mapped }); // 201 Created
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
};

export const updateSolicitudPrestamo = async (req, res) => {
    try {
        await solicitud_prestamoService.update(req.params.id, req.body);
        res.status(200).json({ message: "Solicitud actualizada correctamente" }); // 200 OK
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
};

export const deleteSolicitudPrestamo = async (req, res) => {
    try {
        await solicitud_prestamoService.delete(req.params.id);
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
};

export const toggleEstadoSolicitud = async (req, res) => {
    try {
        await solicitud_prestamoService.toggleEstado(req.params.id);
        res.status(200).json({ message: "Estado actualizado correctamente" }); // 200 OK
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
};
