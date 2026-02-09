import db from '../database/db.js';

const dropTables = async () => {
  try {
    await db.authenticate();
    console.log('Conectado a la base de datos');
    
    // Desactivar restricción de clave foránea temporalmente
    await db.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Dropear tablas problemáticas
    const tablesToDrop = [
      'ingresoreactivo',
      'consumoreactivo',
      'equipos',
      'proveedor',
      'responsable',
      'persona_solicitante'
    ];
    
    for (const table of tablesToDrop) {
      try {
        await db.query(`DROP TABLE IF EXISTS \`${table}\``);
        console.log(`Tabla ${table} eliminada`);
      } catch (err) {
        console.log(`No se pudo eliminar tabla ${table}`);
      }
    }
    
    // Reactivar restricción de clave foránea
    await db.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Restricciones de clave foránea reactivadas');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

dropTables();
