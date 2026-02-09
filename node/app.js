//app.js
import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import EquiposRoutes from './routes/EquiposRoutes.js'
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv'

import proveedoresRoutes from './routes/proveedoresRoutes.js'
import responsablesRoutes from './routes/responsableRoutes.js'
import personaSolicitanteRoutes from './routes/personaSolicitanteRoutes.js'
import estadoSolicitudRoutes from './routes/estadoSolicitudRoutes.js'
import estadoEquipoRoutes from './routes/estadoEquipoRoutes.js'
import consumoreactivoRoutes from './routes/consumoreactivoRoutes.js'
import ingresoreactivoRoutes from './routes/ingresoreactivoRoutes.js'
import solicitud_prestamosRoutes from './routes/solicitud_prestamosRoutes.js'

// Importar modelos para sincronización
import EquiposModel from './models/EquiposModel.js'
import estadoSolicitudModel from './models/estadoSolicitudModel.js'
import estadoEquipoModel from './models/estadoEquipoModel.js'
import personaSolicitanteModel from './models/personaSolicitanteModel.js'
import responsableModel from './models/responsableModel.js'
import solicitud_prestamoModel from './models/solicitud_prestamoModel.js'
import consumoreactivoModel from './models/consumoreactivoModel.js'
import ingresoreactivoModel from './models/ingresoreactivoModel.js'
import proveedoresModel from './models/proveedoresModel.js'
import { seedDatabase } from './seeds/seedData.js'

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());


// Rutas
app.use('/api/equipos', EquiposRoutes);
app.use('/api/proveedor',proveedoresRoutes);
app.use('/api/responsables',responsablesRoutes);
app.use('/api/personaSolicitante',personaSolicitanteRoutes);
app.use('/api/estadosolicitud', estadoSolicitudRoutes);
app.use('/api/estadoequipo', estadoEquipoRoutes);
app.use('/api/consumoreactivo', consumoreactivoRoutes);
app.use('/api/ingresoreactivo', ingresoreactivoRoutes);
app.use('/api/solicitudprestamo', solicitud_prestamosRoutes);
app.use('/api/solicitudxequipo', solicitud_prestamosRoutes);


app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Equipos');
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

//conexion a la base de datos
try {
    await db.authenticate();
    console.log('Conexion a la base de datos establecida');

    // Sincronizar modelos con base de datos
    await db.sync({ alter: false });
    console.log('Modelos sincronizados con la base de datos');

    // Ejecutar seed de datos
    await seedDatabase();
    console.log('Datos iniciales cargados correctamente');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); //finaliza la app si no conecta
}

dotenv.config(); //cargar .env
//servidor
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server up running in http://localhost:${PORT}`)
})
export default app