import estadoSolicitudModel from '../models/estadoSolicitudModel.js';
import estadoEquipoModel from '../models/estadoEquipoModel.js';
import responsableModel from '../models/responsableModel.js';
import proveedoresModel from '../models/proveedoresModel.js';
import personaSolicitanteModel from '../models/personaSolicitanteModel.js';
import consumoreactivoModel from '../models/consumoreactivoModel.js';
import ingresoreactivoModel from '../models/ingresoreactivoModel.js';

export const seedDatabase = async () => {
    try {
        // Insertar datos en estado_solicitud si está vacía
        const countEstadosSolicitud = await estadoSolicitudModel.count();
        if (countEstadosSolicitud === 0) {
            console.log('Insertando datos en estado_solicitud...');
            await estadoSolicitudModel.bulkCreate([
                { estado: 'generado', estados: 1 },
                { estado: 'aceptado', estados: 1 },
                { estado: 'prestado', estados: 1 },
                { estado: 'cancelado', estados: 1 },
                { estado: 'entregado', estados: 1 }
            ]);
            console.log('Datos de estado_solicitud insertados correctamente');
        } else {
            console.log('estado_solicitud ya contiene datos');
        }

        // Insertar datos en Estado_equipo si está vacía
        const countEstadosEquipo = await estadoEquipoModel.count();
        if (countEstadosEquipo === 0) {
            console.log('Insertando datos en Estado_equipo...');
            await estadoEquipoModel.bulkCreate([
                { estado: 'Disponible', estados: 1 },
                { estado: 'En uso', estados: 1 },
                { estado: 'Mantenimiento', estados: 1 },
                { estado: 'Dañado', estados: 1 },
                { estado: 'Retirado', estados: 1 }
            ]);
            console.log('Datos de Estado_equipo insertados correctamente');
        } else {
            console.log('Estado_equipo ya contiene datos');
        }

        // Insertar datos en responsables
        const countResponsables = await responsableModel.count();
        if (countResponsables === 0) {
            console.log('Insertando datos en responsables...');
            await responsableModel.bulkCreate([
                { nombre: 'Juan', apellido: 'Pérez', correo: 'juan@example.com', numero_telefono: '3001234567', cargo: 'instructor', estado: 1 },
                { nombre: 'María', apellido: 'García', correo: 'maria@example.com', numero_telefono: '3107654321', cargo: 'pasante', estado: 1 },
                { nombre: 'Carlos', apellido: 'López', correo: 'carlos@example.com', numero_telefono: '3009876543', cargo: 'gestor', estado: 1 }
            ]);
            console.log('Datos de responsables insertados correctamente');
        } else {
            console.log('Responsables ya contiene datos');
        }

        // Insertar datos en proveedores
        const countProveedores = await proveedoresModel.count();
        if (countProveedores === 0) {
            console.log('Insertando datos en proveedores...');
            await proveedoresModel.bulkCreate([
                { nom_proveedor: 'Distribuidora', apel_proveedor: 'Química', tel_proveedor: '6012345678', dir_proveedor: 'Calle 1 # 100' },
                { nom_proveedor: 'Productos', apel_proveedor: 'Laboratorio', tel_proveedor: '6019876543', dir_proveedor: 'Carrera 2 # 200' },
                { nom_proveedor: 'Equipos', apel_proveedor: 'Científicos', tel_proveedor: '6015555555', dir_proveedor: 'Avenida 3 # 300' }
            ]);
            console.log('Datos de proveedores insertados correctamente');
        } else {
            console.log('Proveedores ya contiene datos');
        }

        // Insertar datos en persona solicitante
        const countPersonaSolicitante = await personaSolicitanteModel.count();
        if (countPersonaSolicitante === 0) {
            console.log('Insertando datos en persona solicitante...');
            await personaSolicitanteModel.bulkCreate([
                { Documento: '1234567890', Nombres: 'Ana', Apellido: 'Martínez', Telefono: '3101111111', Correo: 'ana@example.com', Direccion: 'Calle A # 50' },
                { Documento: '0987654321', Nombres: 'Pedro', Apellido: 'Rodríguez', Telefono: '3102222222', Correo: 'pedro@example.com', Direccion: 'Carrera B # 75' }
            ]);
            console.log('Datos de persona solicitante insertados correctamente');
        } else {
            console.log('Persona solicitante ya contiene datos');
        }

    } catch (error) {
        console.error('Error al hacer seed de datos:', error);
    }
};
